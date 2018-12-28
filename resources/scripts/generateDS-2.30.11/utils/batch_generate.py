#!/usr/bin/env python

"""
usage: batch_generate.py [-h] [--config CONFIG] [-c COMMAND] [--flags FLAGS]
                         [--in-path IN_PATH] [--out-path OUT_PATH] [-v]
                         infilename

synopsis:
  read input directives from JSON file (produced by
  collect_schema_locations.py) and generate python modules.

positional arguments:
  infilename            input JSON file containing directives

optional arguments:
  -h, --help            show this help message and exit
  --config CONFIG       configuration file
  -c COMMAND, --command COMMAND
                        command. Default is "generateDS.py"
  --flags FLAGS         command line options for generateDS.py
  --in-path IN_PATH     path to the directory containing the input schemas
  --out-path OUT_PATH   path to a directory into which modules should be
                        generated
  -v, --verbose         Print messages during actions.

examples:
  python batch_generate.py input_directives.json
  python batch_generate.py --config=name.config input_directives.json

notes:
  The configuration file (see --config) has the following form:

        [generateds]
        verbose = true
        command = ./generateDS.py
        flags = -f --member-specs=dict
        in-path = energistics/prodml/v2.0/xsd_schemas
        out-path = OnePer

    The option names in this configuration file are the long command line
    option names.  Options entered on the command line over-ride options
    in this config file.
  Flags/options for generateDS.py -- These flags are passed to
    generateDS.py as command line options.  Precedence: (1) Flags in
    the directives file override the --flags command line option to
    batch_generate.py.  (2) Flags in the --flags command line option
    to batch_generate.py override flags in the configuration file (the
    argument to --config=).
"""


#
# imports
from __future__ import print_function
import os
import argparse
import configparser
import subprocess
import json


#
# Global variables


#
# Private functions

def dbg_msg(options, msg):
    """Print a message if verbose is on."""
    if options.verbose:
        print(msg)


def generate_one(directive, options):
    """Generate modules for one XML schema."""
    schema_name = directive.get('schema')
    outfilename = directive.get('outfile')
    outsubfilename = directive.get('outsubfile')
    if options.in_path:
        schema_name = os.path.join(options.in_path, schema_name)
    modulename = outfilename.split('.')[0]
    if options.out_path:
        outfilename = os.path.join(options.out_path, outfilename)
    if outsubfilename:
        if options.out_path:
            outsubfilename = os.path.join(options.out_path, outsubfilename)
        outsubfilestem = outsubfilename
        outsubfilename = '--super={} -s {}'.format(modulename, outsubfilename)
    else:
        outsubfilename = ""
        outsubfilestem = outsubfilename
    flags = directive.get('flags')
    if not flags:
        flags = options.flags
    #flags = '{} {}'.format(flags, options.flags)
    cmd = '{} {} -o {} {} {}'.format(
        options.command,
        flags,
        outfilename,
        outsubfilename,
        schema_name,
    )
    dbg_msg(options, '\ncmd: {}'.format(cmd))
    result = subprocess.run(
        cmd,
        stderr=subprocess.PIPE,
        stdout=subprocess.PIPE,
        shell=True,
    )
    dbg_msg(options, 'generated: {} {}'.format(outfilename, outsubfilestem))
    if result.stderr:
        print('errors: {}'.format(result.stderr))
    if result.stdout:
        print('output: {}'.format(result.stdout))


def merge_options(options):
    """Merge config file options and command line options.
    Command line options over-ride config file options.
    """
    config = configparser.ConfigParser()
    config.read(options.config)
    if not config.has_section('generateds-batch'):
        raise RuntimeError(
            'config file missing required section "generateds-batch"')
    section = config['generateds-batch']
    for key in section:
        key1 = key.replace('-', '_')
        if not getattr(options, key1):
            setattr(options, key1, section[key])


def load_json_file(infile):
    """Read file.  Strip out lines that begin with '//'."""
    lines = []
    for line in infile:
        if not line.lstrip().startswith('//'):
            lines.append(line)
    content = ''.join(lines)
    return content


#
# Exported functions
def batch_generate(infile, options):
    """Generate module(s) for each line in directives file."""
    content = load_json_file(infile)
    specification = json.loads(content)
    directives = specification['directives']
    for directive in directives:
        generate_one(directive, options)


def main():
    description = """\
synopsis:
  read input directives from JSON file (produced by
  collect_schema_locations.py) and generate python modules.
"""
    epilog = """\
examples:
  python batch_generate.py input_directives.json
  python batch_generate.py --config=name.config input_directives.json

notes:
  The input directives file is a JSON file.  batch_generate.py will
    run generateDS.py once for each directive in this JSON file.
    This directives file can be produced by
    utils/collect_schema_locations.py.
  The configuration file (see --config) has the following form:

        [generateds]
        verbose = true
        command = ./generateDS.py
        flags = -f --member-specs=dict
        in-path = energistics/prodml/v2.0/xsd_schemas
        out-path = OnePer

    The option names in this configuration file are the long command line
    option names.  Options entered on the command line over-ride options
    in this config file.
  Flags/options for generateDS.py -- These flags are passed to
    generateDS.py as command line options.  Precedence: (1) Flags in
    the directives file override the --flags command line option to
    batch_generate.py.  (2) Flags in the --flags command line option
    to batch_generate.py override flags in the configuration file (the
    argument to --config=).
  The input directives file can contain comments.  Any line whose first
    non-whitespace characters are "//" is considered a comment and is
    discarded before the remaining contents are parsed by the JSON parser.
"""
    parser = argparse.ArgumentParser(
        description=description,
        epilog=epilog,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "infilename",
        help="input JSON file containing directives",
    )
    parser.add_argument(
        "--config",
        help="configuration file",
    )
    parser.add_argument(
        "-c", "--command",
        #default="generateDS.py",
        help="command.  Default is \"generateDS.py\"",
    )
    parser.add_argument(
        "--flags",
        help="command line options for generateDS.py",
    )
    parser.add_argument(
        "--in-path",
        help="path to the directory containing the input schemas",
    )
    parser.add_argument(
        "--out-path",
        help="path to a directory into which modules should be generated",
    )
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Print messages during actions.",
    )
    options = parser.parse_args()
    if options.config:
        merge_options(options)
    if not options.command:
        options.command = 'generateDS.py'
    if not options.flags:
        options.flags = ''
    dbg_msg(options, '\noptions: {}'.format(options))
    infile = open(options.infilename, 'r')
    batch_generate(infile, options)


if __name__ == '__main__':
    #import pdb; pdb.set_trace()
    #import ipdb; ipdb.set_trace()
    main()
