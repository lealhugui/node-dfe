
from __future__ import print_function
import sys
from generateds_definedsimpletypes import Defined_simple_type_table
from generateDS import AnyTypeIdentifier, mapName, cleanupName


#
# Globals

# This variable enables users (modules) that use this module to
# check to make sure that they have imported the correct version
# of generatedssuper.py.
Generate_DS_Super_Marker_ = None

#
# Tables of builtin types
Simple_type_table = {
    'string': None,
    'normalizedString': None,
    'token': None,
    'base64Binary': None,
    'hexBinary': None,
    'integer': None,
    'positiveInteger': None,
    'negativeInteger': None,
    'nonNegativeInteger': None,
    'nonPositiveInteger': None,
    'long': None,
    'unsignedLong': None,
    'int': None,
    'unsignedInt': None,
    'short': None,
    'unsignedShort': None,
    'byte': None,
    'unsignedByte': None,
    'decimal': None,
    'float': None,
    'double': None,
    'boolean': None,
    'duration': None,
    'dateTime': None,
    'date': None,
    'time': None,
    'gYear': None,
    'gYearMonth': None,
    'gMonth': None,
    'gMonthDay': None,
    'gDay': None,
    'Name': None,
    'QName': None,
    'NCName': None,
    'anyURI': None,
    'language': None,
    'ID': None,
    'IDREF': None,
    'IDREFS': None,
    'ENTITY': None,
    'ENTITIES': None,
    'NOTATION': None,
    'NMTOKEN': None,
    'NMTOKENS': None,
}
Integer_type_table = {
    'integer': None,
    'positiveInteger': None,
    'negativeInteger': None,
    'nonNegativeInteger': None,
    'nonPositiveInteger': None,
    'long': None,
    'unsignedLong': None,
    'int': None,
    'unsignedInt': None,
    'short': None,
    'unsignedShort': None,
}
Float_type_table = {
    'decimal': None,
    'float': None,
    'double': None,
}
String_type_table = {
    'string': None,
    'normalizedString': None,
    'token': None,
    'NCName': None,
    'ID': None,
    'IDREF': None,
    'IDREFS': None,
    'ENTITY': None,
    'ENTITIES': None,
    'NOTATION': None,
    'NMTOKEN': None,
    'NMTOKENS': None,
    'QName': None,
    'anyURI': None,
    'base64Binary': None,
    'hexBinary': None,
    'duration': None,
    'Name': None,
    'language': None,
}
Date_type_table = {
    'date': None,
    'gYear': None,
    'gYearMonth': None,
    'gMonth': None,
    'gMonthDay': None,
    'gDay': None,
}
DateTime_type_table = {
    'dateTime': None,
}
Time_type_table = {
    'time': None,
}
Boolean_type_table = {
    'boolean': None,
}


#
# Classes

class GeneratedsSuper(object):
    def gds_format_string(self, input_data, input_name=''):
        return input_data

    def gds_format_integer(self, input_data, input_name=''):
        return '%d' % input_data

    def gds_format_float(self, input_data, input_name=''):
        return '%f' % input_data

    def gds_format_double(self, input_data, input_name=''):
        return '%e' % input_data

    def gds_format_boolean(self, input_data, input_name=''):
        return '%s' % input_data

    def gds_str_lower(self, instring):
        return instring.lower()

    @classmethod
    def get_prefix_name(cls, tag):
        prefix = ''
        name = ''
        items = tag.split(':')
        if len(items) == 2:
            prefix = items[0]
            name = items[1]
        elif len(items) == 1:
            name = items[0]
        return prefix, name

    @classmethod
    def generate_model_(
            cls, wrtmodels, wrtforms, unique_name_map, class_suffixes):
        if class_suffixes:
            model_suffix = '_model'
            form_suffix = '_form'
        else:
            model_suffix = ''
            form_suffix = ''
        class_name = unique_name_map.get(cls.__name__)
        wrtmodels('\nclass %s%s(models.Model):\n' % (
            class_name, model_suffix, ))
        wrtforms('\nclass %s%s(forms.Form):\n' % (
            class_name, form_suffix, ))
        if cls.superclass is not None:
            wrtmodels(
                '    %s = models.ForeignKey(\n' % (
                    cls.superclass.__name__,))
            wrtmodels(
                '        "%s%s",\n' % (
                    cls.superclass.__name__,
                    model_suffix, ))
            wrtmodels(
                '        on_delete=models.CASCADE,\n')
            wrtmodels(
                '    )\n')
        for spec in cls.member_data_items_:
            name = spec.get_name()
            prefix, name = cls.get_prefix_name(name)
            data_type = spec.get_data_type()
            is_optional = spec.get_optional()
            prefix, data_type = cls.get_prefix_name(data_type)
            if data_type in Defined_simple_type_table:
                data_type = Defined_simple_type_table[data_type]
                prefix, data_type = cls.get_prefix_name(data_type.type_name)
            name = mapName(cleanupName(name))
            if name == 'id':
                name += 'x'
            elif name.endswith('_') and not name == AnyTypeIdentifier:
                name += 'x'
            clean_data_type = mapName(cleanupName(data_type))
            if data_type == AnyTypeIdentifier:
                data_type = 'string'
            if data_type in Simple_type_table:
                if is_optional:
                    options = 'blank=True, null=True'
                else:
                    options = ''
                if data_type in Integer_type_table:
                    wrtmodels('    %s = models.IntegerField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.IntegerField(%s)\n' % (
                        name, options, ))
                elif data_type in Float_type_table:
                    wrtmodels('    %s = models.FloatField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.FloatField(%s)\n' % (
                        name, options, ))
                elif data_type in Date_type_table:
                    wrtmodels('    %s = models.DateField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.DateField(%s)\n' % (
                        name, options, ))
                elif data_type in DateTime_type_table:
                    wrtmodels('    %s = models.DateTimeField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.DateTimeField(%s)\n' % (
                        name, options, ))
                elif data_type in Time_type_table:
                    wrtmodels('    %s = models.TimeField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.TimeField(%s)\n' % (
                        name, options, ))
                elif data_type in Boolean_type_table:
                    wrtmodels('    %s = models.NullBooleanField(%s)\n' % (
                        name, options, ))
                    wrtforms('    %s = forms.NullBooleanField(%s)\n' % (
                        name, options, ))
                elif data_type in String_type_table:
                    wrtmodels(
                        '    %s = models.CharField(max_length=1000, %s)\n' % (
                            name, options, ))
                    wrtforms(
                        '    %s = forms.CharField(max_length=1000, %s)\n' % (
                            name, options, ))
                else:
                    sys.stderr.write('Unhandled simple type: %s %s\n' % (
                        name, data_type, ))
            else:
                mapped_type = unique_name_map.get(clean_data_type)
                if mapped_type is not None:
                    clean_data_type = mapped_type
                wrtmodels(
                    '    %s = models.ForeignKey(\n        "%s%s",\n' % (
                        name, clean_data_type, model_suffix, ))
                wrtmodels(
                    '        on_delete=models.CASCADE,\n')
                wrtmodels(
                    '        related_name="{}_{}_{}",\n'.format(
                        class_name, name, clean_data_type, ))
                if is_optional:
                    wrtmodels(
                        '        blank=True, null=True,\n')
                wrtmodels('    )\n')
                wrtforms(
                    '    %s = forms.MultipleChoiceField(%s%s.objects'
                    '.all())\n' % (
                        name, clean_data_type, model_suffix, ))
        wrtmodels('\n')
        wrtmodels('    def __unicode__(self):\n')
        wrtmodels('        return "id: %s" % (self.id, )\n')
        wrtmodels('\n')


#
# Local functions
