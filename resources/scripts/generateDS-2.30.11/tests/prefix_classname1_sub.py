#!/usr/bin/env python

#
# Generated  by generateDS.py.
# Python 3.6.6 |Anaconda custom (64-bit)| (default, Oct  9 2018, 12:34:16)  [GCC 7.3.0]
#
# Command line options:
#   ('--no-dates', '')
#   ('--no-versions', '')
#   ('-p', 'tomato_')
#   ('--member-specs', 'list')
#   ('-f', '')
#   ('-o', 'tests/prefix_classname2_sup.py')
#   ('-s', 'tests/prefix_classname2_sub.py')
#   ('--super', 'prefix_classname2_sup')
#
# Command line arguments:
#   tests/prefix_classname.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions -p "tomato_" --member-specs="list" -f -o "tests/prefix_classname2_sup.py" -s "tests/prefix_classname2_sub.py" --super="prefix_classname2_sup" tests/prefix_classname.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import prefix_classname2_sup as supermod

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


class tomato_peopleSub(supermod.tomato_people):
    def __init__(self, comments=None, person=None, programmer=None, python_programmer=None, java_programmer=None, **kwargs_):
        super(tomato_peopleSub, self).__init__(comments, person, programmer, python_programmer, java_programmer,  **kwargs_)
supermod.tomato_people.subclass = tomato_peopleSub
# end class tomato_peopleSub


class tomato_commentsSub(supermod.tomato_comments):
    def __init__(self, emp=None, valueOf_=None, mixedclass_=None, content_=None, **kwargs_):
        super(tomato_commentsSub, self).__init__(emp, valueOf_, mixedclass_, content_,  **kwargs_)
supermod.tomato_comments.subclass = tomato_commentsSub
# end class tomato_commentsSub


class tomato_personSub(supermod.tomato_person):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, extensiontype_=None, **kwargs_):
        super(tomato_personSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, extensiontype_,  **kwargs_)
supermod.tomato_person.subclass = tomato_personSub
# end class tomato_personSub


class tomato_programmerSub(supermod.tomato_programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, extensiontype_=None, **kwargs_):
        super(tomato_programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, extensiontype_,  **kwargs_)
supermod.tomato_programmer.subclass = tomato_programmerSub
# end class tomato_programmerSub


class tomato_paramSub(supermod.tomato_param):
    def __init__(self, id=None, name=None, sid=None, flow=None, semantic=None, type_=None, valueOf_=None, **kwargs_):
        super(tomato_paramSub, self).__init__(id, name, sid, flow, semantic, type_, valueOf_,  **kwargs_)
supermod.tomato_param.subclass = tomato_paramSub
# end class tomato_paramSub


class tomato_python_programmerSub(supermod.tomato_python_programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, favorite_editor=None, **kwargs_):
        super(tomato_python_programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, favorite_editor,  **kwargs_)
supermod.tomato_python_programmer.subclass = tomato_python_programmerSub
# end class tomato_python_programmerSub


class tomato_java_programmerSub(supermod.tomato_java_programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, status=None, favorite_editor=None, **kwargs_):
        super(tomato_java_programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, status, favorite_editor,  **kwargs_)
supermod.tomato_java_programmer.subclass = tomato_java_programmerSub
# end class tomato_java_programmerSub


class tomato_agentSub(supermod.tomato_agent):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, **kwargs_):
        super(tomato_agentSub, self).__init__(firstname, lastname, priority, info,  **kwargs_)
supermod.tomato_agent.subclass = tomato_agentSub
# end class tomato_agentSub


class tomato_special_agentSub(supermod.tomato_special_agent):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, **kwargs_):
        super(tomato_special_agentSub, self).__init__(firstname, lastname, priority, info,  **kwargs_)
supermod.tomato_special_agent.subclass = tomato_special_agentSub
# end class tomato_special_agentSub


class tomato_boosterSub(supermod.tomato_booster):
    def __init__(self, firstname=None, lastname=None, other_name=None, class_=None, other_value=None, type_=None, client_handler=None, **kwargs_):
        super(tomato_boosterSub, self).__init__(firstname, lastname, other_name, class_, other_value, type_, client_handler,  **kwargs_)
supermod.tomato_booster.subclass = tomato_boosterSub
# end class tomato_boosterSub


class tomato_infoSub(supermod.tomato_info):
    def __init__(self, name=None, type_=None, rating=None, **kwargs_):
        super(tomato_infoSub, self).__init__(name, type_, rating,  **kwargs_)
supermod.tomato_info.subclass = tomato_infoSub
# end class tomato_infoSub


class tomato_client_handlerTypeSub(supermod.tomato_client_handlerType):
    def __init__(self, fullname=None, refid=None, **kwargs_):
        super(tomato_client_handlerTypeSub, self).__init__(fullname, refid,  **kwargs_)
supermod.tomato_client_handlerType.subclass = tomato_client_handlerTypeSub
# end class tomato_client_handlerTypeSub


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
        rootTag = 'people'
        rootClass = supermod.tomato_people
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
        rootTag = 'people'
        rootClass = supermod.tomato_people
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
        rootTag = 'people'
        rootClass = supermod.tomato_people
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
        rootTag = 'people'
        rootClass = supermod.tomato_people
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from prefix_classname2_sup import *\n\n')
        sys.stdout.write('import prefix_classname2_sup as model_\n\n')
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
