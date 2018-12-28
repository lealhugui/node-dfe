#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Synopsis:
    Generate Django models.py and forms.py from XML schema.
Usage:
    python gends_run_gen_django.py [options] <schema_file>
Options:
    -h, --help      Display this help message.
    -f, --force     Overwrite the following files without asking:
                        <schema>lib.py
                        generateds_definedsimpletypes.py
                        models.py
                        forms.py
    -p, --path-to-generateDS-script=/path/to/generateDS.py
                    Path to the generateDS.py script.
    -v, --verbose   Display additional information while running.
    -s, --script    Write out (display) the command lines used.  Can
                    be captured and used in a shell script, for example.
    --no-class-suffixes
                    Do not add suffix "_model" and _form" to
                    generated class names.
Examples:
    python gends_run_gen_django.py my_schema.xsd
    python gends_run_gen_django.py -f -p ../generateDS.py my_other_schema.xsd

"""


#
# Imports

import sys
import getopt
import os
from subprocess import Popen, PIPE
from glob import glob


#
# Globals and constants


#
# Functions for external use


#
# Classes

class GenerateDjangoError(Exception):
    pass


#
# Functions for internal use and testing

def generate(options, schema_file_name):
    schema_name_stem = os.path.splitext(os.path.split(schema_file_name)[1])[0]
    bindings_file_name = '%slib.py' % (schema_name_stem, )
    bindings_file_stem = os.path.splitext(bindings_file_name)[0]
    model_file_name = 'models.py'
    form_file_name = 'forms.py'
    admin_file_name = 'admin.py'
    dbg_msg(options, 'schema_name_stem: %s\n' % (schema_name_stem, ))
    dbg_msg(options, 'bindings_file_name: %s\n' % (bindings_file_name, ))
    if options['force']:
        file_names = (
            glob(bindings_file_name) +
            glob('%s.pyc' % bindings_file_stem) +
            glob('__pycache__/%s.*.pyc' % bindings_file_stem)
        )
        for file_name in file_names:
            dbg_msg(options, 'removing: %s\n' % file_name)
            os.remove(file_name)
    else:
        flag1 = exists(bindings_file_name)
        flag2 = exists(model_file_name)
        flag3 = exists(form_file_name)
        flag4 = exists(admin_file_name)
        if (flag1 or flag2 or flag3 or flag4):
            return
    args = (
        options['path'],
        '-f',
        '-o', '%s' % (bindings_file_name, ),
        '--member-specs=list',
        schema_file_name,
    )
    if not run_cmd(options, args):
        return
    args = (
        './gends_extract_simple_types.py', '-f',
        schema_file_name,
    )
    if not run_cmd(options, args):
        return
    if options['class_suffixes']:
        args = (
            './gends_generate_django.py', '-f',
            bindings_file_stem,
        )
    else:
        args = (
            './gends_generate_django.py', '-f', '--no-class-suffixes',
            bindings_file_stem,
        )
    if not run_cmd(options, args):
        return


def run_cmd(options, args):
    msg = '%s\n' % (' '.join(args), )
    dbg_msg(options, '*** running %s' % (msg, ))
    if options['script']:
        write_msg(options, msg)
    process = Popen(args, stderr=PIPE, stdout=PIPE)
    content1 = process.stderr.read()
    content2 = process.stdout.read()
    if content1:
        sys.stderr.write('*** error ***\n')
        sys.stderr.write(content1.decode('utf-8'))
        sys.stderr.write('*** error ***\n')
    if content2:
        dbg_msg(options, '*** message ***\n')
        dbg_msg(options, content2.decode('utf-8'))
        dbg_msg(options, '*** message ***\n')
    return True


def exists(file_name):
    if os.path.exists(file_name):
        msg = 'File %s exists.  Use -f/--force to overwrite.\n' % (file_name, )
        sys.stderr.write(msg)
        return True
    return False


def dbg_msg(options, msg):
    if options['verbose']:
        if isinstance(msg, str):
            sys.stdout.write(msg)
        else:
            sys.stdout.write(msg.decode('utf-8'))


def write_msg(options, msg):
    if isinstance(msg, str):
        sys.stdout.write(msg)
    else:
        sys.stdout.write(msg.decode('utf-8'))


def usage():
    sys.exit(__doc__)


def main():
    args = sys.argv[1:]
    try:
        opts, args = getopt.getopt(args, 'hvfp:s', [
            'help', 'verbose', 'script',
            'force', 'path-to-generateDS-script=',
            'no-class-suffixes',
        ])
    except:
        usage()
    options = {}
    options['force'] = False
    options['verbose'] = False
    options['script'] = False
    options['path'] = './generateDS.py'
    options['class_suffixes'] = True
    for opt, val in opts:
        if opt in ('-h', '--help'):
            usage()
        elif opt in ('-f', '--force'):
            options['force'] = True
        elif opt in ('-v', '--verbose'):
            options['verbose'] = True
        elif opt in ('-s', '--script'):
            options['script'] = True
        elif opt in ('-p', '--path-to-generateDS-script'):
            options['path'] = val
        elif opt == '--no-class-suffixes':
            options['class_suffixes'] = False
    if not os.path.exists(options['path']):
        sys.exit(
            '\n*** error: Cannot find generateDS.py.  '
            'Use "-p path" command line option.\n')
    if len(args) != 1:
        usage()
    schema_name = args[0]
    generate(options, schema_name)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    #import ipdb; ipdb.set_trace()
    main()
