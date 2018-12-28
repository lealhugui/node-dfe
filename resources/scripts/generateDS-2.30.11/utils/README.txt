===================================
Utility scripts for generateDS.py
===================================

This document provides an explanation of and instructions on the use
of several utilities that are in this subdirectory and that preform
helpful tasks related to ``generateDS.py``.

Note that these utility scripts do not install automatically.  You
can find them in the ``generateds/utirs`` directory; and you can
either copy them to some directory on your path or create a
(symbolic) link to them from some directory on your path.


show_schema_hierarchy.py
==========================

XML schemas often import other schemas which import still other
schemas etc. to an arbitrary depth.  If you feel it might be helpful
to learn which schemas are being imported by your schema and
recursively which schema *they* import, then this utility might be
helpful.

Run ``python show_schema_hierarchy.py --help`` for usage notes.


collect_schema_locations.py
=============================

This utility scans the top level schema and produces a JSON file
containing directives.  This directives file can be used by
``batch_generate.py`` to run ``generateDS.py`` to generate a module
for each of the schema references that is extracted.

Run ``python collect_schema_locations.py --help`` for usage notes.
There are some notes in the ``generateDS.py`` documentation.

Here is a sample of the directives file that is produced::

    {
        "directives": [
            {
                "schema": "DtsInstrumentBox.xsd",
                "outfile": "DtsInstrumentBox.py",
                "outsubfile": "",
                "flags": ""
            },
            {
                "schema": "ProdmlCommon.xsd",
                "outfile": "ProdmlCommon.py",
                "outsubfile": "",
                "flags": "-f --member-specs=list --no-namespace-defs"
            },
            {
                "schema": "FiberOpticalPath.xsd",
                "outfile": "FiberOpticalPath.py",
                "outsubfile": "",
                "flags": ""
            }
        ]
    }


batch_generate.py
===================

``batch_generate.py`` runs ``generateDS.py`` to do batch generation
of multiple modules.  ``batch_generate.py`` determines which modules
to generate from which schemas by reading directives from a JSON
file.  

Run ``python batch_generate.py --help`` for usage notes.  And, there
are a few notes in the ``generateDS.py`` documentation.


The directive file
--------------------

The directives file can be produced by running
``collect_schema_locations.py``, or it can be written by hand.

You can also add command line options to the "flags" entries and can
add the name of sub-class modules to be generated to the
"outsubfile" entries.

Comments in the directives file -- The directives file is a JSON
file, and JSON does not support comments.  However, for use with
``batch_generate.py``, the input directives file can contain
comments.  Any line whose first non-whitespace characters are "//"
is considered a comment and is discarded by ``batch_generate.py``
before the remaining contents are parsed by the JSON parser.

See the notes in this file on ``collect_schema_locations.py`` for a
sample of the directives file.


Options and configuration
---------------------------

Each of the long-name command line options (the ones preceded by
"--", excluding ``--config``) can be placed in a configuration file
and referenced with the ``--config`` command line option.  Here is a
sample of a configuration file::

    [generateds-batch]
    verbose = true
    command = ./generateDS.py
    flags = -f --member-specs=dict
    in-path = energistics/prodml/v2.0/xsd_schemas
    out-path = OnePer3
