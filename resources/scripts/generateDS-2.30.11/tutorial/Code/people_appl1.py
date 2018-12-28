#!/usr/bin/env python

#
# Generated Fri Sep 23 15:04:32 2011 by generateDS.py version 2.6b.
#

import sys

import people_api as supermod

etree_ = None
Verbose_import_ = False
(   XMLParser_import_none, XMLParser_import_lxml,
    XMLParser_import_elementtree
    ) = range(3)
XMLParser_import_library = None
try:
    # lxml
    from lxml import etree as etree_
    XMLParser_import_library = XMLParser_import_lxml
    if Verbose_import_:
        print("running with lxml.etree")
except ImportError:
    try:
        # cElementTree from Python 2.5+
        import xml.etree.cElementTree as etree_
        XMLParser_import_library = XMLParser_import_elementtree
        if Verbose_import_:
            print("running with cElementTree on Python 2.5+")
    except ImportError:
        try:
            # ElementTree from Python 2.5+
            import xml.etree.ElementTree as etree_
            XMLParser_import_library = XMLParser_import_elementtree
            if Verbose_import_:
                print("running with ElementTree on Python 2.5+")
        except ImportError:
            try:
                # normal cElementTree install
                import cElementTree as etree_
                XMLParser_import_library = XMLParser_import_elementtree
                if Verbose_import_:
                    print("running with cElementTree")
            except ImportError:
                try:
                    # normal ElementTree install
                    import elementtree.ElementTree as etree_
                    XMLParser_import_library = XMLParser_import_elementtree
                    if Verbose_import_:
                        print("running with ElementTree")
                except ImportError:
                    raise ImportError("Failed to import ElementTree from any known place")

def parsexml_(*args, **kwargs):
    if (XMLParser_import_library == XMLParser_import_lxml and
        'parser' not in kwargs):
        # Use the lxml ElementTree compatible parser so that, e.g.,
        #   we ignore comments.
        kwargs['parser'] = etree_.ETCompatXMLParser()
    doc = etree_.parse(*args, **kwargs)
    return doc

#
# Globals
#

ExternalEncoding = 'ascii'

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
    def __init__(self, vegetable=None, fruit=None, ratio=None, id=None, value=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, range_=None, extensiontype_=None):
        super(personTypeSub, self).__init__(vegetable, fruit, ratio, id, value, name, interest, category, agent, promoter, description, range_, extensiontype_, )
supermod.personType.subclass = personTypeSub
# end class personTypeSub


class specialpersonSub(supermod.specialperson):
    def __init__(self, vegetable=None, fruit=None, ratio=None, id=None, value=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, range_=None):
        super(specialpersonSub, self).__init__(vegetable, fruit, ratio, id, value, name, interest, category, agent, promoter, description, range_, )
supermod.specialperson.subclass = specialpersonSub
# end class specialpersonSub


class programmerTypeSub(supermod.programmerType):
    def __init__(self, vegetable=None, fruit=None, ratio=None, id=None, value=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, range_=None, language=None, area=None, attrnegint=None, attrposint=None, attrnonnegint=None, attrnonposint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, extensiontype_=None):
        super(programmerTypeSub, self).__init__(vegetable, fruit, ratio, id, value, name, interest, category, agent, promoter, description, range_, language, area, attrnegint, attrposint, attrnonnegint, attrnonposint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eltoken, elshort, ellong, elparam, elarraytypes, extensiontype_, )
supermod.programmerType.subclass = programmerTypeSub
# end class programmerTypeSub


class paramTypeSub(supermod.paramType):
    def __init__(self, semantic=None, name=None, flow=None, sid=None, type_=None, id=None, valueOf_=None):
        super(paramTypeSub, self).__init__(semantic, name, flow, sid, type_, id, valueOf_, )
supermod.paramType.subclass = paramTypeSub
# end class paramTypeSub


class python_programmerTypeSub(supermod.python_programmerType):
    def __init__(self, vegetable=None, fruit=None, ratio=None, id=None, value=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, range_=None, language=None, area=None, attrnegint=None, attrposint=None, attrnonnegint=None, attrnonposint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, nick_name=None, favorite_editor=None, flowvalue=None):
        super(python_programmerTypeSub, self).__init__(vegetable, fruit, ratio, id, value, name, interest, category, agent, promoter, description, range_, language, area, attrnegint, attrposint, attrnonnegint, attrnonposint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eltoken, elshort, ellong, elparam, elarraytypes, nick_name, favorite_editor, flowvalue, )
supermod.python_programmerType.subclass = python_programmerTypeSub
# end class python_programmerTypeSub


class java_programmerTypeSub(supermod.java_programmerType):
    def __init__(self, vegetable=None, fruit=None, ratio=None, id=None, value=None, name=None, interest=None, category=None, agent=None, promoter=None, description=None, range_=None, language=None, area=None, attrnegint=None, attrposint=None, attrnonnegint=None, attrnonposint=None, email=None, elposint=None, elnonposint=None, elnegint=None, elnonnegint=None, eldate=None, eltoken=None, elshort=None, ellong=None, elparam=None, elarraytypes=None, status=None, nick_name=None, favorite_editor=None):
        super(java_programmerTypeSub, self).__init__(vegetable, fruit, ratio, id, value, name, interest, category, agent, promoter, description, range_, language, area, attrnegint, attrposint, attrnonnegint, attrnonposint, email, elposint, elnonposint, elnegint, elnonnegint, eldate, eltoken, elshort, ellong, elparam, elarraytypes, status, nick_name, favorite_editor, )
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
    def __init__(self, member_id=None, firstname=None, lastname=None, other_name=None, classxx=None, other_value=None, type_=None, client_handler=None):
        super(boosterTypeSub, self).__init__(member_id, firstname, lastname, other_name, classxx, other_value, type_, client_handler, )
supermod.boosterType.subclass = boosterTypeSub
# end class boosterTypeSub


class infoTypeSub(supermod.infoType):
    def __init__(self, rating=None, type_=None, name=None):
        super(infoTypeSub, self).__init__(rating, type_, name, )
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
    if hasattr(supermod, tag):
        rootClass = getattr(supermod, tag)
    return tag, rootClass


def parse(inFilename):
    doc = parsexml_(inFilename)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'people'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    sys.stdout.write('<?xml version="1.0" ?>\n')
    rootObj.export(sys.stdout, 0, name_=rootTag,
        namespacedef_='')
    doc = None
    return rootObj


def parseString(inString):
    from StringIO import StringIO
    doc = parsexml_(StringIO(inString))
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'people'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    sys.stdout.write('<?xml version="1.0" ?>\n')
    rootObj.export(sys.stdout, 0, name_=rootTag,
        namespacedef_='')
    return rootObj


def parseLiteral(inFilename):
    doc = parsexml_(inFilename)
    rootNode = doc.getroot()
    rootTag, rootClass = get_root_tag(rootNode)
    if rootClass is None:
        rootTag = 'people'
        rootClass = supermod.peopleType
    rootObj = rootClass.factory()
    rootObj.build(rootNode)
    # Enable Python to collect the space used by the DOM.
    doc = None
    sys.stdout.write('#from people_api import *\n\n')
    sys.stdout.write('import people_api as model_\n\n')
    sys.stdout.write('rootObj = model_.people(\n')
    rootObj.exportLiteral(sys.stdout, 0, name_="people")
    sys.stdout.write(')\n')
    return rootObj


USAGE_TEXT = """
Usage: python ???.py <infilename>
"""

def usage():
    print USAGE_TEXT
    sys.exit(1)


def main():
    args = sys.argv[1:]
    if len(args) != 1:
        usage()
    infilename = args[0]
    root = parse(infilename)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    main()


