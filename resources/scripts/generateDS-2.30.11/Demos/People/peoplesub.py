#!/usr/bin/env python

#
# Generated Thu Jul 19 14:09:57 2018 by generateDS.py version 2.29.17.
# Python 2.7.15 |Anaconda custom (64-bit)| (default, May  1 2018, 23:32:55)  [GCC 7.2.0]
#
# Command line options:
#   ('-f', '')
#   ('-m', '')
#   ('--namespacedef', 'xmlns:pl="http://kuhlman.com/people.xsd"')
#   ('--super', 'peoplesup')
#   ('-o', 'peoplesup.py')
#   ('-s', 'peoplesub.py')
#   ('--member-specs', 'dict')
#   ('-m', '')
#   ('--export', 'write etree literal')
#   ('-c', 'people_catalog.xml')
#
# Command line arguments:
#   people.xsd
#
# Command line:
#   ../../generateDS.py -f -m --namespacedef="xmlns:pl="http://kuhlman.com/people.xsd"" --super="peoplesup" -o "peoplesup.py" -s "peoplesub.py" --member-specs="dict" -m --export="write etree literal" -c "people_catalog.xml" people.xsd
#
# Current working directory (os.getcwd()):
#   People
#

import sys
from lxml import etree as etree_

import peoplesup as supermod

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


class peopleTypeSub(supermod.peopleType):
    def __init__(self, comments=None, person=None, specialperson=None, programmer=None, python_programmer=None, java_programmer=None):
        super(peopleTypeSub, self).__init__(comments, person, specialperson, programmer, python_programmer, java_programmer, )
supermod.peopleType.subclass = peopleTypeSub
# end class peopleTypeSub


class commentsTypeSub(supermod.commentsType):
    def __init__(self, emp=None, bold=None, valueOf_=None, mixedclass_=None, content_=None):
        super(commentsTypeSub, self).__init__(emp, bold, valueOf_, mixedclass_, content_, )
supermod.commentsType.subclass = commentsTypeSub
# end class commentsTypeSub


class personTypeSub(supermod.personType):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, hot_agent=None, agent=None, promoter=None, description=None, range_=None, with_=None, extensiontype_=None):
        super(personTypeSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, hot_agent, agent, promoter, description, range_, with_, extensiontype_, )
supermod.personType.subclass = personTypeSub
# end class personTypeSub


class specialpersonSub(supermod.specialperson):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, hot_agent=None, agent=None, promoter=None, description=None, range_=None, with_=None):
        super(specialpersonSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, hot_agent, agent, promoter, description, range_, with_, )
supermod.specialperson.subclass = specialpersonSub
# end class specialpersonSub


class programmerTypeSub(supermod.programmerType):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, hot_agent=None, agent=None, promoter=None, description=None, range_=None, with_=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eldatetime1=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, extensiontype_=None):
        super(programmerTypeSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, hot_agent, agent, promoter, description, range_, with_, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eldatetime1, eltoken, elshort, ellong, elparam, elarraytypes, extensiontype_, )
supermod.programmerType.subclass = programmerTypeSub
# end class programmerTypeSub


class paramTypeSub(supermod.paramType):
    def __init__(self, id=None, name=None, sid=None, flow=None, semantic=None, type_=None, valueOf_=None):
        super(paramTypeSub, self).__init__(id, name, sid, flow, semantic, type_, valueOf_, )
supermod.paramType.subclass = paramTypeSub
# end class paramTypeSub


class python_programmerTypeSub(supermod.python_programmerType):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, hot_agent=None, agent=None, promoter=None, description=None, range_=None, with_=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eldatetime1=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, drcs_attr=None, gui_developer=None, favorite_editor=None, flowvalue=None, drcs=None):
        super(python_programmerTypeSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, hot_agent, agent, promoter, description, range_, with_, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eldatetime1, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, drcs_attr, gui_developer, favorite_editor, flowvalue, drcs, )
supermod.python_programmerType.subclass = python_programmerTypeSub
# end class python_programmerTypeSub


class java_programmerTypeSub(supermod.java_programmerType):
    def __init__(self, value=None, id=None, ratio=None, fruit=None, vegetable=None, name=None, interest=None, category=None, hot_agent=None, agent=None, promoter=None, description=None, range_=None, with_=None, language=None, area=None, attrposint=None, attrnonposint=None, attrnegint=None, attrnonnegint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eldatetime=None, eldatetime1=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, status=None, favorite_editor=None, datetime1=None, datetime2=None, datetime3=None, datetime4=None, datetime5=None):
        super(java_programmerTypeSub, self).__init__(value, id, ratio, fruit, vegetable, name, interest, category, hot_agent, agent, promoter, description, range_, with_, language, area, attrposint, attrnonposint, attrnegint, attrnonnegint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eldatetime, eldatetime1, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, status, favorite_editor, datetime1, datetime2, datetime3, datetime4, datetime5, )
supermod.java_programmerType.subclass = java_programmerTypeSub
# end class java_programmerTypeSub


class agentTypeSub(supermod.agentType):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, vehicle=None, extensiontype_=None):
        super(agentTypeSub, self).__init__(firstname, lastname, priority, info, vehicle, extensiontype_, )
supermod.agentType.subclass = agentTypeSub
# end class agentTypeSub


class special_agentTypeSub(supermod.special_agentType):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, vehicle=None):
        super(special_agentTypeSub, self).__init__(firstname, lastname, priority, info, vehicle, )
supermod.special_agentType.subclass = special_agentTypeSub
# end class special_agentTypeSub


class weird_agentTypeSub(supermod.weird_agentType):
    def __init__(self, firstname=None, lastname=None, priority=None, info=None, vehicle=None):
        super(weird_agentTypeSub, self).__init__(firstname, lastname, priority, info, vehicle, )
supermod.weird_agentType.subclass = weird_agentTypeSub
# end class weird_agentTypeSub


class boosterTypeSub(supermod.boosterType):
    def __init__(self, member_id=None, firstname=None, lastname=None, other_name=None, class_=None, other_value=None, type_=None, client_handler=None):
        super(boosterTypeSub, self).__init__(member_id, firstname, lastname, other_name, class_, other_value, type_, client_handler, )
supermod.boosterType.subclass = boosterTypeSub
# end class boosterTypeSub


class infoTypeSub(supermod.infoType):
    def __init__(self, name=None, type_=None, rating=None):
        super(infoTypeSub, self).__init__(name, type_, rating, )
supermod.infoType.subclass = infoTypeSub
# end class infoTypeSub


class vehicleTypeSub(supermod.vehicleType):
    def __init__(self, wheelcount=None, extensiontype_=None):
        super(vehicleTypeSub, self).__init__(wheelcount, extensiontype_, )
supermod.vehicleType.subclass = vehicleTypeSub
# end class vehicleTypeSub


class automobileSub(supermod.automobile):
    def __init__(self, wheelcount=None, drivername=None):
        super(automobileSub, self).__init__(wheelcount, drivername, )
supermod.automobile.subclass = automobileSub
# end class automobileSub


class hot_agentSub(supermod.hot_agent):
    def __init__(self, firstname='empty\\name', lastname='no \'last\' name', priority=None, startDate=None):
        super(hot_agentSub, self).__init__(firstname, lastname, priority, startDate, )
supermod.hot_agent.subclass = hot_agentSub
# end class hot_agentSub


class airplaneSub(supermod.airplane):
    def __init__(self, wheelcount=None, pilotname=None):
        super(airplaneSub, self).__init__(wheelcount, pilotname, )
supermod.airplane.subclass = airplaneSub
# end class airplaneSub


class client_handlerTypeSub(supermod.client_handlerType):
    def __init__(self, fullname=None, refid=None):
        super(client_handlerTypeSub, self).__init__(fullname, refid, )
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
        rootTag = 'peopleType'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('<?xml version="1.0" ?>\n')
        rootObj.export(
            sys.stdout, 0, name_=rootTag,
            namespacedef_='xmlns:pl="http://kuhlman.com/people.xsd"',
            pretty_print=True)
    return rootObj


def parseEtree(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'peopleType'
        rootClass = supermod.peopleType
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
        rootTag = 'peopleType'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('<?xml version="1.0" ?>\n')
        rootObj.export(
            sys.stdout, 0, name_=rootTag,
            namespacedef_='xmlns:pl="http://kuhlman.com/people.xsd"')
    return rootObj


def parseLiteral(inFilename, silence=False):
    parser = None
    doc = parsexml_(inFilename, parser)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'peopleType'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    if not silence:
        sys.stdout.write('#from peoplesup import *\n\n')
        sys.stdout.write('import peoplesup as model_\n\n')
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
