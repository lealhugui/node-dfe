#!/usr/bin/env python

#
# Generated  by generateDS.py.
# Python 3.6.6 |Anaconda custom (64-bit)| (default, Oct  9 2018, 12:34:16)  [GCC 7.3.0]
#
# Command line options:
#   ('--no-dates', '')
#   ('--no-versions', '')
#   ('--member-specs', 'list')
#   ('-f', '')
#   ('-o', 'tests/mixedcontent2_sup.py')
#   ('-s', 'tests/mixedcontent2_sub.py')
#   ('--super', 'mixedcontent2_sup')
#
# Command line arguments:
#   tests/mixedcontent.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions --member-specs="list" -f -o "tests/mixedcontent2_sup.py" -s "tests/mixedcontent2_sub.py" --super="mixedcontent2_sup" tests/mixedcontent.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import mixedcontent2_sup as supermod

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
# Data representation classes
#


class rootTypeSub(supermod.rootType):
    def __init__(self, markup=None, **kwargs_):
        super(rootTypeSub, self).__init__(markup,  **kwargs_)
supermod.rootType.subclass = rootTypeSub
# end class rootTypeSub


class markupTypeSub(supermod.markupType):
    def __init__(self, embedded=None, nested=None, valueOf_=None, mixedclass_=None, content_=None, **kwargs_):
        super(markupTypeSub, self).__init__(embedded, nested, valueOf_, mixedclass_, content_,  **kwargs_)
supermod.markupType.subclass = markupTypeSub
# end class markupTypeSub


class nestedTypeSub(supermod.nestedType):
    def __init__(self, nested1=None, nested2=None, nested3=None, **kwargs_):
        super(nestedTypeSub, self).__init__(nested1, nested2, nested3,  **kwargs_)
supermod.nestedType.subclass = nestedTypeSub
# end class nestedTypeSub


class nested1TypeSub(supermod.nested1Type):
    def __init__(self, nestedA1=None, nestedA2=None, **kwargs_):
        super(nested1TypeSub, self).__init__(nestedA1, nestedA2,  **kwargs_)
supermod.nested1Type.subclass = nested1TypeSub
# end class nested1TypeSub


class nested1ATypeSub(supermod.nested1AType):
    def __init__(self, nestedB1=None, nestedB2=None, **kwargs_):
        super(nested1ATypeSub, self).__init__(nestedB1, nestedB2,  **kwargs_)
supermod.nested1AType.subclass = nested1ATypeSub
# end class nested1ATypeSub


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
        rootTag = 'rootType'
        rootClass = supermod.rootType
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
        rootTag = 'rootType'
        rootClass = supermod.rootType
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
        rootTag = 'rootType'
        rootClass = supermod.rootType
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
        rootTag = 'rootType'
        rootClass = supermod.rootType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from mixedcontent2_sup import *\n\n')
        sys.stdout.write('import mixedcontent2_sup as model_\n\n')
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
    parse(infilename)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    main()
