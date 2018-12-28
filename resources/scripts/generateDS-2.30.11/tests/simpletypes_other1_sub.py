#!/usr/bin/env python

#
# Generated  by generateDS.py.
# Python 3.6.6 |Anaconda custom (64-bit)| (default, Oct  9 2018, 12:34:16)  [GCC 7.3.0]
#
# Command line options:
#   ('--no-dates', '')
#   ('--no-versions', '')
#   ('--silence', '')
#   ('--member-specs', 'list')
#   ('-f', '')
#   ('-o', 'tests/simpletypes_other2_sup.py')
#   ('-s', 'tests/simpletypes_other2_sub.py')
#   ('--super', 'simpletypes_other2_sup')
#
# Command line arguments:
#   tests/simpletypes_other.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions --silence --member-specs="list" -f -o "tests/simpletypes_other2_sup.py" -s "tests/simpletypes_other2_sub.py" --super="simpletypes_other2_sup" tests/simpletypes_other.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import simpletypes_other2_sup as supermod

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


class simpleTypeTestsTypeSub(supermod.simpleTypeTestsType):
    def __init__(self, simpleTypeTest=None, **kwargs_):
        super(simpleTypeTestsTypeSub, self).__init__(simpleTypeTest,  **kwargs_)
supermod.simpleTypeTestsType.subclass = simpleTypeTestsTypeSub
# end class simpleTypeTestsTypeSub


class simpleTypeTestDefsSub(supermod.simpleTypeTestDefs):
    def __init__(self, datetime1=None, datetime2=None, datetime3=None, datetime4=None, datetime5=None, integerVal1=None, integerVal2=None, stringVal1=None, stringVal2=None, booleanVal1=None, booleanVal2=None, decimalVal1=None, decimalVal2=None, doubleVal1=None, doubleVal2=None, floatVal1=None, floatVal2=None, dateVal1=None, dateVal2=None, dateTimeVal1=None, dateTimeVal2=None, **kwargs_):
        super(simpleTypeTestDefsSub, self).__init__(datetime1, datetime2, datetime3, datetime4, datetime5, integerVal1, integerVal2, stringVal1, stringVal2, booleanVal1, booleanVal2, decimalVal1, decimalVal2, doubleVal1, doubleVal2, floatVal1, floatVal2, dateVal1, dateVal2, dateTimeVal1, dateTimeVal2,  **kwargs_)
supermod.simpleTypeTestDefs.subclass = simpleTypeTestDefsSub
# end class simpleTypeTestDefsSub


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
        rootTag = 'simpleTypeTestsType'
        rootClass = supermod.simpleTypeTestsType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
##     if not silence:
##         sys.stdout.write('<?xml version="1.0" ?>\n')
##         rootObj.export(
##             sys.stdout, 0, name_=rootTag,
##             namespacedef_='',
##             pretty_print=True)
    return rootObj


def parseEtree(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'simpleTypeTestsType'
        rootClass = supermod.simpleTypeTestsType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    mapping = {}
    rootElement = rootObj.to_etree(None, name_=rootTag, mapping_=mapping)
    reverse_mapping = rootObj.gds_reverse_node_mapping(mapping)
##     if not silence:
##         content = etree_.tostring(
##             rootElement, pretty_print=True,
##             xml_declaration=True, encoding="utf-8")
##         sys.stdout.write(content)
##         sys.stdout.write('\n')
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
        rootTag = 'simpleTypeTestsType'
        rootClass = supermod.simpleTypeTestsType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
##     if not silence:
##         sys.stdout.write('<?xml version="1.0" ?>\n')
##         rootObj.export(
##             sys.stdout, 0, name_=rootTag,
##             namespacedef_='')
    return rootObj


def parseLiteral(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'simpleTypeTestsType'
        rootClass = supermod.simpleTypeTestsType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
##     if not silence:
##         sys.stdout.write('#from simpletypes_other2_sup import *\n\n')
##         sys.stdout.write('import simpletypes_other2_sup as model_\n\n')
##         sys.stdout.write('rootObj = model_.rootClass(\n')
##         rootObj.exportLiteral(sys.stdout, 0, name_=rootTag)
##         sys.stdout.write(')\n')
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
