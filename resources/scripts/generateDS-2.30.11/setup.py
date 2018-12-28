
#from distutils.core import setup
from setuptools import setup

setup(
    name="generateDS",
#
# Do not modify the following VERSION comments.
# Used by updateversion.py.
##VERSION##
    version="2.30.11",
##VERSION##
    author="Dave Kuhlman",
    author_email="dkuhlman@davekuhlman.org",
    maintainer="Dave Kuhlman",
    maintainer_email="dkuhlman@davekuhlman.org",
    url="http://www.davekuhlman.org/generateDS.html",
    description="Generate Python data structures and XML parser from Xschema",
    long_description="""\
generateDS.py generates Python data structures (for example, class
definitions) from an XML Schema document.  These data structures
represent the elements in an XML document described by the XML
Schema.  It also generates parsers that load an XML document into
those data structures.  In addition, a separate file containing
subclasses (stubs) is optionally generated.  The user can add
methods to the subclasses in order to process the contents of an
XML document.""",
    platforms="platform-independent",
    license="http://www.opensource.org/licenses/mit-license.php",
    py_modules=[
        "process_includes",
    ],
    # include_package_data=True,
    packages=[
        "libgenerateDS",
        "libgenerateDS.gui",
    ],
    scripts=[
        "generateDS.py",
        "process_includes.py",
        "libgenerateDS/gui/generateds_gui.py",
        "django/gends_run_gen_django.py",
        "django/gends_extract_simple_types.py",
        "django/gends_generate_django.py",
    ],
    entry_points={
        "console_scripts": [
            "generateDS = generateDS:main",
            "process_includes = process_includes:main",
            "generateds_gui = generateds_gui:main",
            "gends_run_gen_django = gends_run_gen_django:main",
            "gends_extract_simple_types = gends_extract_simple_types:main",
            "gends_generate_django = gends_generate_django:main",
        ],
    },
    install_requires=[
        "six",
        "lxml",
    ],
)
