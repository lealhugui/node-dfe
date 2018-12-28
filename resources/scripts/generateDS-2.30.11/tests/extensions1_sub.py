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
#   ('-o', 'tests/extensions2_sup.py')
#   ('-s', 'tests/extensions2_sub.py')
#   ('--super', 'extensions2_sup')
#
# Command line arguments:
#   tests/extensions.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions --silence --member-specs="list" -f -o "tests/extensions2_sup.py" -s "tests/extensions2_sub.py" --super="extensions2_sup" tests/extensions.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import extensions2_sup as supermod

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


class SpecialDateSub(supermod.SpecialDate):
    def __init__(self, SpecialProperty=None, valueOf_=None, **kwargs_):
        super(SpecialDateSub, self).__init__(SpecialProperty, valueOf_,  **kwargs_)
supermod.SpecialDate.subclass = SpecialDateSub
# end class SpecialDateSub


class ExtremeDateSub(supermod.ExtremeDate):
    def __init__(self, ExtremeProperty=None, valueOf_=None, **kwargs_):
        super(ExtremeDateSub, self).__init__(ExtremeProperty, valueOf_,  **kwargs_)
supermod.ExtremeDate.subclass = ExtremeDateSub
# end class ExtremeDateSub


class singleExtremeDateSub(supermod.singleExtremeDate):
    def __init__(self, ExtremeProperty=None, valueOf_=None, **kwargs_):
        super(singleExtremeDateSub, self).__init__(ExtremeProperty, valueOf_,  **kwargs_)
supermod.singleExtremeDate.subclass = singleExtremeDateSub
# end class singleExtremeDateSub


class containerTypeSub(supermod.containerType):
    def __init__(self, simplefactoid=None, mixedfactoid=None, **kwargs_):
        super(containerTypeSub, self).__init__(simplefactoid, mixedfactoid,  **kwargs_)
supermod.containerType.subclass = containerTypeSub
# end class containerTypeSub


class simpleFactoidTypeSub(supermod.simpleFactoidType):
    def __init__(self, relation=None, **kwargs_):
        super(simpleFactoidTypeSub, self).__init__(relation,  **kwargs_)
supermod.simpleFactoidType.subclass = simpleFactoidTypeSub
# end class simpleFactoidTypeSub


class mixedFactoidTypeSub(supermod.mixedFactoidType):
    def __init__(self, relation=None, valueOf_=None, mixedclass_=None, content_=None, **kwargs_):
        super(mixedFactoidTypeSub, self).__init__(relation, valueOf_, mixedclass_, content_,  **kwargs_)
supermod.mixedFactoidType.subclass = mixedFactoidTypeSub
# end class mixedFactoidTypeSub


class BaseTypeSub(supermod.BaseType):
    def __init__(self, BaseProperty1=None, BaseProperty2=None, valueOf_=None, extensiontype_=None, **kwargs_):
        super(BaseTypeSub, self).__init__(BaseProperty1, BaseProperty2, valueOf_, extensiontype_,  **kwargs_)
supermod.BaseType.subclass = BaseTypeSub
# end class BaseTypeSub


class DerivedTypeSub(supermod.DerivedType):
    def __init__(self, BaseProperty1=None, BaseProperty2=None, DerivedProperty1=None, DerivedProperty2=None, valueOf_=None, **kwargs_):
        super(DerivedTypeSub, self).__init__(BaseProperty1, BaseProperty2, DerivedProperty1, DerivedProperty2, valueOf_,  **kwargs_)
supermod.DerivedType.subclass = DerivedTypeSub
# end class DerivedTypeSub


class MyIntegerSub(supermod.MyInteger):
    def __init__(self, MyAttr=None, valueOf_=None, **kwargs_):
        super(MyIntegerSub, self).__init__(MyAttr, valueOf_,  **kwargs_)
supermod.MyInteger.subclass = MyIntegerSub
# end class MyIntegerSub


class MyBooleanSub(supermod.MyBoolean):
    def __init__(self, MyAttr=None, valueOf_=None, **kwargs_):
        super(MyBooleanSub, self).__init__(MyAttr, valueOf_,  **kwargs_)
supermod.MyBoolean.subclass = MyBooleanSub
# end class MyBooleanSub


class MyFloatSub(supermod.MyFloat):
    def __init__(self, MyAttr=None, valueOf_=None, **kwargs_):
        super(MyFloatSub, self).__init__(MyAttr, valueOf_,  **kwargs_)
supermod.MyFloat.subclass = MyFloatSub
# end class MyFloatSub


class MyDoubleSub(supermod.MyDouble):
    def __init__(self, MyAttr=None, valueOf_=None, **kwargs_):
        super(MyDoubleSub, self).__init__(MyAttr, valueOf_,  **kwargs_)
supermod.MyDouble.subclass = MyDoubleSub
# end class MyDoubleSub


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
        rootTag = 'containerType'
        rootClass = supermod.containerType
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
        rootTag = 'containerType'
        rootClass = supermod.containerType
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
        rootTag = 'containerType'
        rootClass = supermod.containerType
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
        rootTag = 'containerType'
        rootClass = supermod.containerType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
##     if not silence:
##         sys.stdout.write('#from extensions2_sup import *\n\n')
##         sys.stdout.write('import extensions2_sup as model_\n\n')
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
