#!/usr/bin/env python
# -*- coding: utf-8 -*-

#
# Imports

from __future__ import print_function
import sys
import os
import argparse
if sys.version_info.major == 2:
    from StringIO import StringIO as stringio
else:
    from io import StringIO as stringio
from lxml import etree
import process_includes


#
# Globals and constants

SchemaNS = 'http://www.w3.org/2001/XMLSchema'
Nsmap = {
    'xs': SchemaNS,
}


#
# Functions for external use


#
# Classes

class TypeDescriptor(object):
    def __init__(self, name, type_name=None):
        self.name_ = name
        self.type_name_ = type_name
        self.type_obj_ = None

    def __str__(self):
        return '<%s -- name: %s type: %s>' % (
            self.__class__.__name__,
            self.name, self.type_name,)

    def get_name_(self):
        return self.name_

    def set_name_(self, name):
        self.name_ = name
    name = property(get_name_, set_name_)

    def get_type_name_(self):
        return self.type_name_

    def set_type_name_(self, type_name):
        self.type_name_ = type_name
    type_name = property(get_type_name_, set_type_name_)

    def get_type_obj_(self):
        return self.type_obj_

    def set_type_obj_(self, type_obj):
        self.type_obj_ = type_obj
    type_obj = property(get_type_obj_, set_type_obj_)


class ComplexTypeDescriptor(TypeDescriptor):
    def __init__(self, name):
        super(ComplexTypeDescriptor, self).__init__(name)
        self.elements_ = []
        self.attributes_ = {}

    def get_elements_(self):
        return self.elements_

    def set_elements_(self, elements):
        self.elements_ = elements
    elements = property(get_elements_, set_elements_)

    def get_attributes_(self):
        return self.attributes_

    def set_attributes_(self, attributes):
        self.attributes_ = attributes
    attributes = property(get_attributes_, set_attributes_)


class SimpleTypeDescriptor(TypeDescriptor):
    def __init__(self, name, type_name):
        super(SimpleTypeDescriptor, self).__init__(name, type_name)

Header_template = """
class TypeDescriptor(object):
    def __init__(self, name, type_name=None):
        self.name_ = name
        self.type_name_ = type_name
        self.type_obj_ = None
    def __str__(self):
        return '<%s -- name: %s type: %s>' % (self.__class__.__name__,
            self.name, self.type_name,)
    def get_name_(self):
        return self.name_
    def set_name_(self, name):
        self.name_ = name
    name = property(get_name_, set_name_)
    def get_type_name_(self):
        return self.type_name_
    def set_type_name_(self, type_name):
        self.type_name_ = type_name
    type_name = property(get_type_name_, set_type_name_)
    def get_type_obj_(self):
        return self.type_obj_
    def set_type_obj_(self, type_obj):
        self.type_obj_ = type_obj
    type_obj = property(get_type_obj_, set_type_obj_)

class ComplexTypeDescriptor(TypeDescriptor):
    def __init__(self, name):
        super(ComplexTypeDescriptor, self).__init__(name)
        self.elements_ = []
        self.attributes_ = {}
    def get_elements_(self):
        return self.elements_
    def set_elements_(self, elements):
        self.elements_ = elements
    elements = property(get_elements_, set_elements_)
    def get_attributes_(self):
        return self.attributes_
    def set_attributes_(self, attributes):
        self.attributes_ = attributes
    attributes = property(get_attributes_, set_attributes_)

class SimpleTypeDescriptor(TypeDescriptor):
    def __init__(self, name, type_name):
        super(SimpleTypeDescriptor, self).__init__(name, type_name)

"""


#
# Table of builtin types
Simple_type_names = [
    'string',
    'normalizedString',
    'token',
    'base64Binary',
    'hexBinary',
    'integer',
    'positiveInteger',
    'negativeInteger',
    'nonNegativeInteger',
    'nonPositiveInteger',
    'long',
    'unsignedLong',
    'int',
    'unsignedInt',
    'short',
    'unsignedShort',
    'byte',
    'unsignedByte',
    'decimal',
    'float',
    'double',
    'boolean',
    'duration',
    'dateTime',
    'date',
    'time',
    'gYear',
    'gYearMonth',
    'gMonth',
    'gMonthDay',
    'gDay',
    'Name',
    'QName',
    'NCName',
    'anyURI',
    'language',
    'ID',
    'IDREF',
    'IDREFS',
    'ENTITY',
    'ENTITIES',
    'NOTATION',
    'NMTOKEN',
    'NMTOKENS',
]

Builtin_descriptors = {}
for name in Simple_type_names:
    Builtin_descriptors[name] = SimpleTypeDescriptor(name, name)


#
# Functions for internal use and testing

def extract_descriptors(args):
    if os.path.exists(args.outfilename) and not args.force:
        sys.stderr.write(
            '\nFile %s exists.  Use -f/--force to overwrite.\n\n' % (
                args.outfilename,))
        sys.exit(1)
    outfile = open(args.outfilename, 'w')

    schema_file_name = os.path.join(
        os.path.abspath(os.path.curdir),
        args.infilename)
    infile = stringio()
    process_includes.process_include_files(
        args.infilename, infile,
        inpath=schema_file_name)
    infile.seek(0)

    doc = etree.parse(infile)
    root = doc.getroot()
    descriptors = {}
    extract(root, descriptors, outfile)
    for descriptor in list(descriptors.values()):
        descriptor.export(outfile)
    outfile.close()


def get_descriptor_name(d):
    return d.name


def extract(root, descriptors, outfile):
    unresolved = {}
    # Process top level simpleTypes.  Resolve the base types.
    nodes = root.xpath('xs:simpleType', namespaces=Nsmap)
    for node in nodes:
        name, type_name = get_simple_name_type(node)
        descriptor = SimpleTypeDescriptor(name, type_name)
        unresolved[name] = descriptor
    resolved = resolve_simple_types(unresolved)
    export_defined_simple_types(outfile, resolved)
##     for descriptor in resolved.itervalues():
##         print '%s  type name: %s' % (descriptor, descriptor.type_obj.name, )


def export_defined_simple_types(outfile, resolved):
    wrt = outfile.write
    wrt(Header_template)
    wrt('Defined_simple_type_table = {\n')
    for descriptor in list(resolved.values()):
        name = descriptor.name
        prefix, type_name = get_prefix_name(descriptor.type_name)
        wrt("    '%s': SimpleTypeDescriptor('%s', '%s'),\n" % (
            name, name, type_name, ))
    wrt('}\n\n')


def resolve_simple_types(unresolved):
    resolved = {}
    #import pdb; pdb.set_trace()
    sorted_descriptors = list(unresolved.values())
    sorted_descriptors.sort(key=get_descriptor_name)
    for descriptor in sorted_descriptors:
        resolve_1_simple_type(descriptor, resolved, unresolved)
    return resolved


def resolve_1_simple_type(descriptor, resolved, unresolved):
    prefix, name = get_prefix_name(descriptor.type_name)
    if name in Builtin_descriptors:
        type_obj = Builtin_descriptors[name]
        descriptor.type_obj = type_obj
        resolved[descriptor.name] = descriptor
        return type_obj
    elif name in resolved:
        type_obj = resolved[name].type_obj
        descriptor.type_obj = type_obj
        resolved[descriptor.name] = descriptor
        return type_obj
    else:
        type_name = descriptor.type_name
        if type_name not in unresolved:
            # If we can't find it, try after stripping off namespace prefix.
            type_name = type_name.split(':')[-1]
            if type_name not in unresolved:
                raise XmlSchemaError(
                    "Can't find simple type (%s) in unresolved types." % (
                        type_name))
        type_obj = resolve_1_simple_type(
            unresolved[type_name],
            resolved, unresolved)
        descriptor.type_obj = type_obj
        resolved[descriptor.name] = descriptor
    return type_obj


def get_simple_name_type(node):
    type_name = None
    name = node.get('name')
    # Is it a restriction?
    if name is not None:
        nodes = node.xpath('.//xs:restriction', namespaces=Nsmap)
        if nodes:
            restriction = nodes[0]
            type_name = restriction.get('base')
    # Not a restriction.  Try list.
    if type_name is None:
        nodes = node.xpath('.//xs:list', namespaces=Nsmap)
        if nodes:
            type_name = 'string'
    # Not a list.  Try union.
    if type_name is None:
        nodes = node.xpath('.//xs:union', namespaces=Nsmap)
        if nodes:
            union = nodes[0]
            member_types = union.get('memberTypes')
            if member_types:
                member_types = member_types.split()
                if member_types:
                    type_name = member_types[0]
    return name, type_name


def get_prefix_name(tag):
    prefix = ''
    name = ''
    items = tag.split(':')
    if len(items) == 2:
        prefix = items[0]
        name = items[1]
    elif len(items) == 1:
        name = items[0]
    return prefix, name


def etxpath(node, pat):
    nodes = node.xpath(pat, namespaces=Nsmap)
    return nodes


USAGE_TEXT = __doc__


def usage():
    print(USAGE_TEXT)
    sys.exit(1)

USAGE_TEXT = """synopsis: capture XML Schema simpleType descriptors
"""


def main():
    parser = argparse.ArgumentParser(description=USAGE_TEXT)
    parser.add_argument(
        '-v', '--verbose', action='store_true',
        help='show additional info')
    parser.add_argument(
        '-f', '--force', action='store_true',
        help='force overwrite of output file without asking')
    parser.add_argument(
        'infilename', type=str,
        help='input XML Schema file')
    parser.add_argument(
        '-o', '--outfile', type=str, dest='outfilename',
        default='generateds_definedsimpletypes.py',
        help='output (.py) file name')
    args = parser.parse_args()
    extract_descriptors(args)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    main()
