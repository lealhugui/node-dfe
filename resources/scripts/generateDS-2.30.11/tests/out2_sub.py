#!/usr/bin/env python

#
# Generated  by generateDS.py.
# Python 3.6.6 |Anaconda custom (64-bit)| (default, Oct  9 2018, 12:34:16)  [GCC 7.3.0]
#
# Command line options:
#   ('--no-dates', '')
#   ('--no-versions', '')
#   ('-f', '')
#   ('-o', 'tests/out2_sup.py')
#   ('-s', 'tests/out2_sub.py')
#   ('--export', 'write literal')
#   ('--super', 'out2_sup')
#   ('-u', 'gends_user_methods')
#
# Command line arguments:
#   tests/people.xsd
#
# Command line:
#   generateDS.py --no-dates --no-versions -f -o "tests/out2_sup.py" -s "tests/out2_sub.py" --export="write literal" --super="out2_sup" -u "gends_user_methods" tests/people.xsd
#
# Current working directory (os.getcwd()):
#   generateds
#

import sys
from lxml import etree as etree_

import out2_sup as supermod

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


class peopleSub(supermod.people):
    def __init__(self, comments=None, person=None, programmer=None, python_programmer=None, java_programmer=None, **kwargs_):
        super(peopleSub, self).__init__(comments, person, programmer, python_programmer, java_programmer,  **kwargs_)
supermod.people.subclass = peopleSub
# end class peopleSub


class commentsSub(supermod.comments):
    def __init__(self, emp=None, valueOf_=None, mixedclass_=None, content_=None, **kwargs_):
        super(commentsSub, self).__init__(emp, valueOf_, mixedclass_, content_,  **kwargs_)
supermod.comments.subclass = commentsSub
# end class commentsSub


class personSub(supermod.person):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, extensiontype_=None, **kwargs_):
        super(personSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, extensiontype_,  **kwargs_)
supermod.person.subclass = personSub
# end class personSub


class programmerSub(supermod.programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, extensiontype_=None, **kwargs_):
        super(programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, extensiontype_,  **kwargs_)
supermod.programmer.subclass = programmerSub
# end class programmerSub


class paramSub(supermod.param):
    def __init__(self, id=None, name=None, sid=None, flow=None, semantic=None, type_=None, valueOf_=None, **kwargs_):
        super(paramSub, self).__init__(id, name, sid, flow, semantic, type_, valueOf_,  **kwargs_)
supermod.param.subclass = paramSub
# end class paramSub


class python_programmerSub(supermod.python_programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, favorite_editor=None, **kwargs_):
        super(python_programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, favorite_editor,  **kwargs_)
supermod.python_programmer.subclass = python_programmerSub
# end class python_programmerSub


class java_programmerSub(supermod.java_programmer):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, status=None, favorite_editor=None, **kwargs_):
        super(java_programmerSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, agent, promoter, description, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, status, favorite_editor,  **kwargs_)
supermod.java_programmer.subclass = java_programmerSub
# end class java_programmerSub


class agentSub(supermod.agent):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, **kwargs_):
        super(agentSub, self).__init__(firstname, lastname, priority, info,  **kwargs_)
supermod.agent.subclass = agentSub
# end class agentSub


class special_agentSub(supermod.special_agent):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, **kwargs_):
        super(special_agentSub, self).__init__(firstname, lastname, priority, info,  **kwargs_)
supermod.special_agent.subclass = special_agentSub
# end class special_agentSub


class boosterSub(supermod.booster):
    def __init__(self, firstname=None, lastname=None, other_name=None, class_=None, other_value=None, type_=None, client_handler=None, **kwargs_):
        super(boosterSub, self).__init__(firstname, lastname, other_name, class_, other_value, type_, client_handler,  **kwargs_)
supermod.booster.subclass = boosterSub
# end class boosterSub


class infoSub(supermod.info):
    def __init__(self, name=None, type_=None, rating=None, **kwargs_):
        super(infoSub, self).__init__(name, type_, rating,  **kwargs_)
supermod.info.subclass = infoSub
# end class infoSub


class client_handlerTypeSub(supermod.client_handlerType):
    def __init__(self, fullname=None, refid=None, **kwargs_):
        super(client_handlerTypeSub, self).__init__(fullname, refid,  **kwargs_)
supermod.client_handlerType.subclass = client_handlerTypeSub
# end class client_handlerTypeSub


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
        rootClass = supermod.people
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
        rootClass = supermod.people
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
        rootClass = supermod.people
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
        rootClass = supermod.people
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from out2_sup import *\n\n')
        sys.stdout.write('import out2_sup as model_\n\n')
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
