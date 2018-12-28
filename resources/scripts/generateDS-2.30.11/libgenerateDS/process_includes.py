#!/usr/bin/env python
"""
    python %prog [options] <in_schema.xsd>  <out_schema.xsd>
Synopsis:
    Prepare schema document.  Replace include and import elements.
Examples:
    python %prog myschema.xsd
    python %prog myschema.xsd newschema.xsd
    python %prog -f myschema.xsd newschema.xsd
    cat infile.xsd | python %prog > outfile.xsd
"""

#
# Imports

import sys
import os
import urllib2
import ftplib
import copy
import types
from optparse import OptionParser, Values
import itertools
from lxml import etree


#
# Globals and constants


#
# Functions for external use

def process_include_files(infile, outfile, inpath=''):
    options = Values({
        'force': False, 
        })
    prep_schema_doc(infile, outfile, inpath, options)


#
# Classes

class Params(object):
    members = ('base_url', 'already_processed', 'parent_url', )
    def __init__(self):
        self.base_url = None
        self.already_processed = set()
        self.parent_url = None
    def __setattr__(self, name, value):
        if name not in self.members:
            raise AttributeError('Class %s has no set-able attribute "%s"' % (
                self.__class__.__name__,  name, ))
        self.__dict__[name] = value


class SchemaIOError(IOError):
    pass


#
# Functions for internal use and testing


def clear_includes_and_imports(node):
    namespace = node.nsmap[node.prefix]
    child_iter1 = node.iterfind('{%s}include' % (namespace, ))
    child_iter2 = node.iterfind('{%s}import' % (namespace, ))
    for child in itertools.chain(child_iter1, child_iter2):
        repl = etree.Comment(etree.tostring(child))
        node.replace(child, repl)


def resolve_ref(node, params, options):
    content = None
    url = node.get('schemaLocation')
    if not url:
        msg = '*** Warning: missing "schemaLocation" attribute in %s\n' % (
            params.parent_url, )
        sys.stderr.write(msg)
        return None
    # Uncomment the next line to help track down missing schemaLocation etc.
    # print '(resolve_ref) url: %s\n    parent-url: %s' % (url, params.parent_url, )

    if params.base_url and not (
        url.startswith('/') or
        url.startswith('http:') or
        url.startswith('ftp:')
        ):
        locn = '%s/%s' % (params.base_url, url, )
    else:
        locn = url
    if locn is not None:
        schema_name = os.path.split(locn)
        if schema_name not in params.already_processed:
            params.already_processed.add(schema_name)
            print 'trace --'
            print '    base  : %s' % (params.base_url, )
            print '    parent: %s' % (params.parent_url, )
            print '    locn  : %s' % (locn, )
            if locn.startswith('http:') or locn.startswith('ftp:'):
                try:
                    urlfile = urllib2.urlopen(locn)
                    content = urlfile.read()
                    urlfile.close()
                    params.parent_url = locn
                    params.base_url = os.path.split(locn)[0]
                except urllib2.HTTPError, exp:
                    msg = "Can't find file %s referenced in %s." % (
                        locn, params.parent_url, )
                    raise SchemaIOError(msg)
            else:
                if os.path.exists(locn):
                    infile = open(locn)
                    content = infile.read()
                    infile.close()
                    params.parent_url = locn
                    params.base_url = os.path.split(locn)[0]
                if content is None:
                    msg = "Can't find file %s referenced in %s." % (
                        locn, params.parent_url, )
                    raise SchemaIOError(msg)
##     if content is None:
##         msg = "Can't find file %s referenced in %s." % (
##             locn, params.parent_url, )
##         raise SchemaIOError(msg)
    return content


def collect_inserts(node, params, inserts, options):
    namespace = node.nsmap[node.prefix]
    child_iter1 = node.iterfind('{%s}include' % (namespace, ))
    child_iter2 = node.iterfind('{%s}import' % (namespace, ))
    for child in itertools.chain(child_iter1, child_iter2):
        collect_inserts_aux(child, params, inserts, options)


def collect_inserts_aux(child, params, inserts, options):
    save_base_url = params.base_url
    string_content = resolve_ref(child, params, options)
    if string_content is not None:
        root = etree.fromstring(string_content, base_url=params.base_url)
        for child1 in root:
            if not isinstance(child1, etree._Comment):
                namespace = child1.nsmap[child1.prefix]
                if (child1.tag != '{%s}include' % (namespace, ) and
                    child1.tag != '{%s' % (namespace, )):
                    comment = etree.Comment(etree.tostring(child))
                    inserts.append(comment)
                    inserts.append(child1)
        collect_inserts(root, params, inserts, options)
    params.base_url = save_base_url


def make_file(outFileName, options):
    outFile = None
    if (not options.force) and os.path.exists(outFileName):
        reply = raw_input('File %s exists.  Overwrite? (y/n): ' % outFileName)
        if reply == 'y':
            outFile = open(outFileName, 'w')
    else:
        outFile = open(outFileName, 'w')
    return outFile


def prep_schema_doc(infile, outfile, inpath, options):
    doc1 = etree.parse(infile)
    root1 = doc1.getroot()
    params = Params()
    params.parent_url = infile
    params.base_url = os.path.split(inpath)[0]
    inserts = []
    collect_inserts(root1, params, inserts, options)
    root2 = copy.copy(root1)
    clear_includes_and_imports(root2)
    for insert_node in inserts:
        root2.append(insert_node)
    doc2 = etree.ElementTree(root2)
    doc2.write(outfile)
    return doc2


def prep_schema(inpath, outpath, options):
    if inpath:
        infile = open(inpath, 'r')
    else:
        infile = sys.stdin
    if outpath:
        outfile = make_file(outpath, options)
    else:
        outfile = sys.stdout
    if outfile is None:
        return
    prep_schema_doc(infile, outfile, inpath, options)
    if inpath:
        infile.close()
    if outpath:
        outfile.close()


USAGE_TEXT = __doc__

def usage(parser):
    parser.print_help()
    sys.exit(1)


def main():
    parser = OptionParser(USAGE_TEXT)
    parser.add_option("-f", "--force", action="store_true",
        dest="force", default=False,
        help="force overwrite without asking")
    (options, args) = parser.parse_args()
    if len(args) == 2:
        inpath = args[0]
        outpath = args[1]
    elif len(args) == 1:
        inpath = args[0]
        outpath = None
    elif len(args) == 0:
        inpath = None
        outpath = None
    else:
        usage(parser)
    prep_schema(inpath, outpath, options)

        
if __name__ == "__main__":
    #import pdb; pdb.set_trace()
    main()

