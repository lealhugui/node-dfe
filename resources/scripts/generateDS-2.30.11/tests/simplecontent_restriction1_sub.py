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
#   ('-o', 'tests/simplecontent_restriction2_sup.py')
#   ('-s', 'tests/simplecontent_restriction2_sub.py')
#   ('--super', 'simplecontent_restriction2_sup')
#
# Command line arguments:
#   tests/simplecontent_restriction.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions --silence --member-specs="list" -f -o "tests/simplecontent_restriction2_sup.py" -s "tests/simplecontent_restriction2_sub.py" --super="simplecontent_restriction2_sup" tests/simplecontent_restriction.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import simplecontent_restriction2_sup as supermod

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


class IdentifierTypeSub(supermod.IdentifierType):
    def __init__(self, schemeID=None, schemeName=None, schemeAgencyID=None, schemeAgencyName=None, schemeVersionID=None, schemeDataURI=None, schemeURI=None, valueOf_=None, extensiontype_=None, **kwargs_):
        super(IdentifierTypeSub, self).__init__(schemeID, schemeName, schemeAgencyID, schemeAgencyName, schemeVersionID, schemeDataURI, schemeURI, valueOf_, extensiontype_,  **kwargs_)
supermod.IdentifierType.subclass = IdentifierTypeSub
# end class IdentifierTypeSub


class BillOfResourcesIDTypeSub(supermod.BillOfResourcesIDType):
    def __init__(self, schemeID=None, schemeName=None, schemeAgencyID=None, schemeAgencyName=None, schemeVersionID=None, schemeDataURI=None, schemeURI=None, valueOf_=None, **kwargs_):
        super(BillOfResourcesIDTypeSub, self).__init__(schemeID, schemeName, schemeAgencyID, schemeAgencyName, schemeVersionID, schemeDataURI, schemeURI, valueOf_,  **kwargs_)
supermod.BillOfResourcesIDType.subclass = BillOfResourcesIDTypeSub
# end class BillOfResourcesIDTypeSub


class BillOfMaterialIDTypeSub(supermod.BillOfMaterialIDType):
    def __init__(self, schemeID=None, schemeName=None, schemeAgencyID=None, schemeAgencyName=None, schemeVersionID=None, schemeDataURI=None, schemeURI=None, valueOf_=None, **kwargs_):
        super(BillOfMaterialIDTypeSub, self).__init__(schemeID, schemeName, schemeAgencyID, schemeAgencyName, schemeVersionID, schemeDataURI, schemeURI, valueOf_,  **kwargs_)
supermod.BillOfMaterialIDType.subclass = BillOfMaterialIDTypeSub
# end class BillOfMaterialIDTypeSub


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
        rootTag = 'IdentifierType'
        rootClass = supermod.IdentifierType
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
        rootTag = 'IdentifierType'
        rootClass = supermod.IdentifierType
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
        rootTag = 'IdentifierType'
        rootClass = supermod.IdentifierType
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
        rootTag = 'IdentifierType'
        rootClass = supermod.IdentifierType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
##     if not silence:
##         sys.stdout.write('#from simplecontent_restriction2_sup import *\n\n')
##         sys.stdout.write('import simplecontent_restriction2_sup as model_\n\n')
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
