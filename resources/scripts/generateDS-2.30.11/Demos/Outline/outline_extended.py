#!/usr/bin/env python

#
# Generated Thu Jul 19 13:39:44 2018 by generateDS.py version 2.29.17.
# Python 2.7.15 |Anaconda custom (64-bit)| (default, May  1 2018, 23:32:55)  [GCC 7.2.0]
#
# Command line options:
#   ('-o', 'outline.py')
#   ('-s', 'outline_extended.py')
#   ('--super', 'outline')
#
# Command line arguments:
#   outline.xsd
#
# Command line:
#   ../../generateDS.py -o "outline.py" -s "outline_extended.py" --super="outline" outline.xsd
#
# Current working directory (os.getcwd()):
#   Outline
#

import sys
from lxml import etree as etree_

import outline as supermod

def parsexml_(infile, parser=None, **kwargs):
    if parser is None:
        # Use the lxml ElementTree compatible parser so that, e.g.,
        #   we ignore comments.
        parser = etree_.ETCompatXMLParser()
    doc = etree_.parse(infile, parser=parser, **kwargs)
    return doc

#
# Globals
#

ExternalEncoding = ''

#
# Support/utility functions.
#

def showIndent(outfile, level):
    for idx in range(level):
        outfile.write('    ')


#
# Data representation classes
#


class outlineSub(supermod.outline):
    def __init__(self, name=None, description=None, child=None):
        super(outlineSub, self).__init__(name, description, child, )
    def show(self, outfile, level):
        outfile.write('==========================================\n')
        outfile.write('Outline name: %s\n' % self.name)
        outfile.write('Outline description: %s\n' % self.description)
        outfile.write('==========================================\n')
        for child in self.child:
            child.show(outfile, level)
        outfile.write('==========================================\n')
supermod.outline.subclass = outlineSub
# end class outlineSub


class nodeTypeSub(supermod.nodeType):
    def __init__(self, hidden=None, label=None, text=None, child=None):
        super(nodeTypeSub, self).__init__(hidden, label, text, child, )
    def show(self, outfile, level):
        if self.hidden == 't':
            return
        showIndent(outfile, level)
        outfile.write('%s.  %s\n' % (self.label, self.text))
        for child in self.child:
            child.show(outfile, level + 1)
supermod.nodeType.subclass = nodeTypeSub
# end class nodeTypeSub


def get_root_tag(node):
    tag = supermod.Tag_pattern_.match(node.tag).groups()[-1]
    rootClass = None
    rootClass = supermod.GDSClassesMapping.get(tag)
    if rootClass is None and hasattr(supermod, tag):
        rootClass = getattr(supermod, tag)
    return tag, rootClass


def parse(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'outline'
        rootClass = supermod.outline
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('<?xml version="1.0" ?>\n')
        rootObj.export(
            sys.stdout, 0, name_=rootTag,
            namespacedef_='',
            pretty_print=True)
    return rootObj


def parseEtree(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'outline'
        rootClass = supermod.outline
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    mapping = {}
    rootElement = rootObj.to_etree(None, name_=rootTag, mapping_=mapping)
    reverse_mapping = rootObj.gds_reverse_node_mapping(mapping)
    if not silence:
        content = etree_.tostring(
            rootElement, pretty_print=True,
            xml_declaration=True, encoding="utf-8")
        sys.stdout.write(content)
        sys.stdout.write('\n')
    return rootObj, rootElement, mapping, reverse_mapping


def parseString(inString, silence=False):
    if sys.version_info.major == 2:
        from StringIO import StringIO
    else:
        from io import BytesIO as StringIO
    parser = None
    doc = parsexml_(StringIO(inString), parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'outline'
        rootClass = supermod.outline
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('<?xml version="1.0" ?>\n')
        rootObj.export(
            sys.stdout, 0, name_=rootTag,
            namespacedef_='')
    return rootObj


def parseLiteral(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'outline'
        rootClass = supermod.outline
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from outline import *\n\n')
        sys.stdout.write('import outline as model_\n\n')
        sys.stdout.write('rootObj = model_.rootClass(\n')
        rootObj.exportLiteral(sys.stdout, 0, name_=rootTag)
        sys.stdout.write(')\n')
    return rootObj


USAGE_TEXT = """
Usage: python ???.py <infilename>
"""


def usage():
    print(USAGE_TEXT)
    sys.exit(1)


def main():
    args = sys.argv[1:]
    if len(args) != 1:
        usage()
    infilename = args[0]
    root = parse(infilename)
    root.show(sys.stdout, 0)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    main()
