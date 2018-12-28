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
#   ('-o', 'tests/defaults_cases2_sup.py')
#   ('-s', 'tests/defaults_cases2_sub.py')
#   ('--super', 'defaults_cases2_sup')
#
# Command line arguments:
#   tests/defaults_cases.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions --member-specs="list" -f -o "tests/defaults_cases2_sup.py" -s "tests/defaults_cases2_sub.py" --super="defaults_cases2_sup" tests/defaults_cases.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import defaults_cases2_sup as supermod

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


class DefaultTypesSub(supermod.DefaultTypes):
    def __init__(self, default1=None, default2=None, fixed1=None, fixed2=None, **kwargs_):
        super(DefaultTypesSub, self).__init__(default1, default2, fixed1, fixed2,  **kwargs_)
supermod.DefaultTypes.subclass = DefaultTypesSub
# end class DefaultTypesSub


class DefaultType1Sub(supermod.DefaultType1):
    def __init__(self, normal01=None, normal02=None, default01=23, default02='Peach', normal03=None, normal04=None, default03=23.45, default04=54.32, **kwargs_):
        super(DefaultType1Sub, self).__init__(normal01, normal02, default01, default02, normal03, normal04, default03, default04,  **kwargs_)
supermod.DefaultType1.subclass = DefaultType1Sub
# end class DefaultType1Sub


class DefaultType2Sub(supermod.DefaultType2):
    def __init__(self, attrdefault01='abcd', attrdefault02=14, attrnormal01=None, attrnormal02=None, **kwargs_):
        super(DefaultType2Sub, self).__init__(attrdefault01, attrdefault02, attrnormal01, attrnormal02,  **kwargs_)
supermod.DefaultType2.subclass = DefaultType2Sub
# end class DefaultType2Sub


class FixedType1Sub(supermod.FixedType1):
    def __init__(self, normal01=None, normal02=None, fixed01=None, fixed02=None, normal03=None, normal04=None, fixed03=None, fixed04=None, **kwargs_):
        super(FixedType1Sub, self).__init__(normal01, normal02, fixed01, fixed02, normal03, normal04, fixed03, fixed04,  **kwargs_)
supermod.FixedType1.subclass = FixedType1Sub
# end class FixedType1Sub


class FixedType2Sub(supermod.FixedType2):
    def __init__(self, attrfixed01='abcd', attrfixed02=14, attrnormal01=None, attrnormal02=None, **kwargs_):
        super(FixedType2Sub, self).__init__(attrfixed01, attrfixed02, attrnormal01, attrnormal02,  **kwargs_)
supermod.FixedType2.subclass = FixedType2Sub
# end class FixedType2Sub


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
        rootTag = 'DefaultTypes'
        rootClass = supermod.DefaultTypes
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
        rootTag = 'DefaultTypes'
        rootClass = supermod.DefaultTypes
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
        rootTag = 'DefaultTypes'
        rootClass = supermod.DefaultTypes
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
        rootTag = 'DefaultTypes'
        rootClass = supermod.DefaultTypes
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from defaults_cases2_sup import *\n\n')
        sys.stdout.write('import defaults_cases2_sup as model_\n\n')
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
