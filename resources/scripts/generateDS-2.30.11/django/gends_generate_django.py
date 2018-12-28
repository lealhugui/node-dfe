#!/usr/bin/env python
"""
Synopsis:
    Generate Django model and form definitions.
    Write to forms.py and models.py.
Usage:
    python gen_model.py [options]
Options:
    -f, --force
            Overwrite models.py and forms.py without asking.
    --no-class-suffixes
            Do not add suffix "_model" and _form" to generated class names.
    -h, --help
            Show this help message.
"""


from __future__ import print_function
import sys
import os
import getopt
import importlib
import traceback


#
# Globals
#

supermod = None

#
# Classes
#


class ProgramOptions(object):
    def get_force_(self):
        return self.force_

    def set_force_(self, force):
        self.force_ = force
    force = property(get_force_, set_force_)


class Writer(object):
    def __init__(self, outfilename, stdout_also=False):
        self.outfilename = outfilename
        self.outfile = open(outfilename, 'w')
        self.stdout_also = stdout_also
        self.line_count = 0

    def get_count(self):
        return self.line_count

    def write(self, content):
        self.outfile.write(content)
        if self.stdout_also:
            sys.stdout.write(content)
        count = content.count('\n')
        self.line_count += count

    def close(self):
        self.outfile.close()


#
# Functions
#

def generate_model(options, module_name):

    if options.class_suffixes:
        model_suffix = '_model'
        form_suffix = '_form'
    else:
        model_suffix = ''
        form_suffix = ''

    global supermod
    try:
        import generatedssuper
    except ImportError:
        traceback.print_exc()
        sys.exit(
            '\n* Error.  Cannot import generatedssuper.py.\n'
            'Make sure that the version of generatedssuper.py intended\n'
            'for django support is first on your PYTHONPATH.\n'
        )
    if not hasattr(generatedssuper, 'Generate_DS_Super_Marker_'):
        sys.exit(
            '\n* Error.  Not the correct version of generatedssuper.py.\n'
            'Make sure that the version of generatedssuper.py intended\n'
            'for django support is first on your PYTHONPATH.\n'
        )
    supermod = importlib.import_module(module_name)
    models_file_name = 'models.py'
    forms_file_name = 'forms.py'
    admin_file_name = 'admin.py'
    if (
            (
                os.path.exists(models_file_name) or
                os.path.exists(forms_file_name) or
                os.path.exists(admin_file_name)
            ) and
            not options.force):
        sys.stderr.write(
            '\nmodels.py or forms.py or admin.py exists.  '
            'Use -f/--force to overwrite.\n\n')
        sys.exit(1)
    models_writer = Writer(models_file_name)
    forms_writer = Writer(forms_file_name)
    admin_writer = Writer(admin_file_name)
    wrtmodels = models_writer.write
    wrtforms = forms_writer.write
    wrtadmin = admin_writer.write
    unique_name_map = make_unique_name_map(supermod.__all__)
    wrtmodels('from django.db import models\n\n')
    wrtforms('from django import forms\n\n')
    for class_name in supermod.__all__:
        if hasattr(supermod, class_name):
            cls = getattr(supermod, class_name)
            cls.generate_model_(
                wrtmodels, wrtforms, unique_name_map, options.class_suffixes)
        else:
            sys.stderr.write('class %s not defined\n' % (class_name, ))
    wrtadmin('from django.contrib import admin\n')
    wrtadmin('from .models import \\\n')
    first_time = True
    for class_name in supermod.__all__:
        class_name = unique_name_map.get(class_name)
        if first_time:
            wrtadmin('    %s%s' % (class_name, model_suffix ))
            first_time = False
        else:
            wrtadmin(', \\\n    %s%s' % (class_name, model_suffix ))
    wrtadmin('\n\n')
    for class_name in supermod.__all__:
        class_name = unique_name_map.get(class_name)
        wrtadmin('admin.site.register(%s%s)\n' % (class_name, model_suffix ))
    wrtadmin('\n')
    models_writer.close()
    forms_writer.close()
    admin_writer.close()
    print('Wrote %d lines to models.py' % (models_writer.get_count(), ))
    print('Wrote %d lines to forms.py' % (forms_writer.get_count(), ))
    print('Wrote %d lines to admin.py' % (admin_writer.get_count(), ))


def make_unique_name_map(name_list):
    """Make a mapping from names to names that are unique ignoring case."""
    unique_name_table = {}
    unique_name_set = set()
    for name in name_list:
        make_unique_name(name, unique_name_table, unique_name_set)
    return unique_name_table


def make_unique_name(name, unique_name_table, unique_name_set):
    """Create a name that is unique even when we ignore case."""
    new_name = name
    lower_name = new_name.lower()
    count = 0
    while lower_name in unique_name_set:
        count += 1
        new_name = '{}_{:d}'.format(name, count)
        lower_name = new_name.lower()
    unique_name_table[name] = new_name
    unique_name_set.add(lower_name)


USAGE_TEXT = __doc__


def usage():
    print(USAGE_TEXT)
    sys.exit(1)


def main():
    args = sys.argv[1:]
    try:
        opts, args = getopt.getopt(
            args, 'hfs:', [
                'help', 'force',
                'no-class-suffixes', ])
    except:
        usage()
    options = ProgramOptions()
    options.force = False
    options.class_suffixes = True
    for opt, val in opts:
        if opt in ('-h', '--help'):
            usage()
        elif opt in ('-f', '--force'):
            options.force = True
        elif opt == '--no-class-suffixes':
            options.class_suffixes = False
    if len(args) != 1:
        usage()
    module_name = args[0]
    generate_model(options, module_name)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    #import ipdb; ipdb.set_trace()
    main()
