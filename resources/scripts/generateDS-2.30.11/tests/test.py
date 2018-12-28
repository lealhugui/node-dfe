#!/usr/bin/env python

"""
synopsis:
    Run unit tests for generateDS.
usage:
    On the command line:
        $ cd generateds/tests
        $ python test.py
notes:
    Only Python 3, not Python 2, is supported for unit tests.
"""

from __future__ import print_function

import difflib
import sys
import os
import subprocess
import getopt
import unittest

from lxml import etree

#import generateDS


class GenTest(unittest.TestCase):
    def execute(self, cmd, cwd=None, env=None):
        p = subprocess.Popen(
            cmd, cwd=cwd,
            stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            shell=True,
            env=env)
        stdout, stderr = p.communicate()
        return stdout, stderr

    def executeClean(self, cmd, cwd=None, env=None):
        if env is None:
            env = os.environ
        stdout, stderr = self.execute(cmd, cwd, env)
        self.assertEqual(
            len(stdout), 0, "stdout was not empty:\n{}".format(stdout))
        self.assertEqual(
            len(stderr), 0, "stderr was not empty:\n{}".format(stderr))

##     def setUp(self):
##         print('running setUp')
##         cmd = (
##             'python generateDS.py --no-dates --no-versions -f '
##             '-o tests/out2_sup.py -s tests/out2_sub.py '
##             '--super=out2_sup -u gends_user_methods tests/people.xsd'
##         )
##         stdout, stderr = self.execute(cmd, cwd='..')
##         self.failUnlessEqual(len(stdout), 0)
##         self.failUnlessEqual(len(stderr), 0)

##     def tearDown(self):
##         for f in [ "out2_sub.py", "out2_sup.py" ]:
##             try:
##                 os.unlink(f)
##             except OSError:
##                 pass

    def test_001_compare_superclasses(self):
        cmd = (
            'python generateDS.py --no-dates --no-versions -f '
            '-o tests/out2_sup.py -s tests/out2_sub.py '
            '--export="write literal" '
            '--super=out2_sup -u gends_user_methods tests/people.xsd'
        )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('out1_sup.py', 'out2_sup.py', ignore=())
        self.compareFiles('out1_sub.py', 'out2_sub.py')
        # cleanup generated files
        self.remove('out2_sup.py')
        self.remove('out2_sub.py')

    def test_003_element_groups(self):
        cmdTempl = (
            'python generateDS.py --no-dates --silence '
            '--member-specs=list -f '
            '-o tests/%s_sup.py -s tests/%s_sub.py '
            '--super=%s_sup tests/%s.xsd'
        )
        t_ = 'groups'
        cmd = cmdTempl % (t_, t_, t_, t_)
        self.executeClean(cmd, cwd='..')
        # Verify the structure
        cmdTempl = (
            'python -c "import %s_sub; print('
            '[ x.name for x in %s_sub.node1TypeSub.member_data_items_ ]); '
            'print([ x.name for x in '
            '%s_sub.node2TypeSub.member_data_items_ ])"'
        )
        cmd = cmdTempl % (t_, t_, t_)
        result, err = self.execute(cmd)
        if sys.version_info.major != 2:
            result = result.decode()
        self.failUnlessEqual(result, """\
['node1node1', 'group1', 'group2', 'node1node2']
['node2node1', 'group1', 'group2', 'node2node2']
""")
        # load the XML, and verify the proper data was loaded
        cmdTempl = (
            'python -c "import %s_sub; obj = '
            '%s_sub.parse(\'%s.xml\'); fields = '
            '[ x.name for x in obj.node1.member_data_items_ ]; '
            'print([ getattr(obj.node1, x) for x in fields ]); '
            'fields = [ x.name for x in obj.node2.member_data_items_ ]; '
            'print([ getattr(obj.node2, x) for x in fields ])"'
        )
        cmd = cmdTempl % (t_, t_, t_)
        result, err = self.execute(cmd)
        if sys.version_info.major != 2:
            result = result.decode()
        self.failUnlessEqual(result, """\
['value 1 1', 'group1 1', 'group2 1', 'value 1 2']
['value 2 1', 'group1 2', 'group2 2', 'value 2 2']
""")
        # cleanup generated files
        self.remove('{}_sup.py'.format(t_))
        self.remove('{}_sub.py'.format(t_))

    def test_004_valueof(self):
        cmdTempl = (
            'python generateDS.py --no-dates --silence '
            '--member-specs=list -f '
            '-o tests/%s_sup.py -s tests/%s_sub.py '
            '--super=%s_sup tests/%s.xsd'
        )
        t_ = 'valueof'
        cmd = cmdTempl % (t_, t_, t_, t_)
        self.executeClean(cmd, cwd='..')
        # load the XML, and verify the proper data was loaded
        # Run these commands::
        #     import valueof_sub
        #     obj = valueof_sub.parse('valueof.xml')
        #     children = obj.get_child()
        #     print [ (x.get_name(), x.get_valueOf_()) for x in children ]
        #
        cmdTempl = (
            'python -c "import %s_sub; obj = '
            '%s_sub.parse(\'%s.xml\'); children = obj.get_child(); '
            'print([ (x.get_name(), x.get_valueOf_()) for x in children ])"'
        )
        cmd = cmdTempl % (t_, t_, t_)
        result, err = self.execute(cmd)
        if sys.version_info.major != 2:
            result = result.decode()
        self.failUnlessEqual(result, """\
[('child1', 'value1'), ('child1', 'value2')]
""")
        # Now try to create a node, make sure the value of valueOf_ is passed
        # in
        # Run these commands::
        #     import valueof_sub
        #     node = valueof_sub.childTypeSub.factory(
        #             name='child1', valueOf_ = 'value1')
        #     print (node.get_name(), node.get_valueOf_())

        cmdTempl = (
            'python -c "import %s_sub; '
            'node = %s_sub.childTypeSub.factory(name=\'child1\', '
            'valueOf_ = \'value1\'); '
            'print((node.get_name(), node.get_valueOf_()))"'
        )
        cmd = cmdTempl % (t_, t_)
        #print('cmd:', cmd)
        result, err = self.execute(cmd)
        #print('result: %s' % result)
        if sys.version_info.major != 2:
            result = result.decode()
        self.failUnlessEqual(result, """\
('child1', 'value1')
""")
        # cleanup generated files
        self.remove('{}_sup.py'.format(t_))
        self.remove('{}_sub.py'.format(t_))

    ns_for_import_xml1 = """\
<root xmlns="http://a" xmlns:bl="http://blah">
  <bl:sra>
    <childa1/>
  </bl:sra>
</root>
"""

    ns_for_import_xml2 = """\
<root xmlns="http://b" xmlns:bl="http://blah">
  <bl:srb1>
    <childb1/>
    <childb2/>
  </bl:srb1>
</root>
"""

    ns_for_import_xml_result = """\
<root xmlns="http://a" xmlns:bl="http://blah">
  <bl:sra>
    <childa1/>
  </bl:sra>
<bl:srb1 xmlns="http://b">
    <childb1/>
    <childb2/>
  </bl:srb1>
</root>
"""

    def test_005_ns_for_import(self):
        root1 = etree.fromstring(GenTest.ns_for_import_xml1)
        root2 = etree.fromstring(GenTest.ns_for_import_xml2)
        for child in root2.getchildren():
            root1.append(child.__copy__())
        #print etree.tostring(root1, pretty_print = True)
        result = etree.tostring(root1, pretty_print=True)
        if sys.version_info.major != 2:
            result = result.decode()
        self.failUnlessEqual(GenTest.ns_for_import_xml_result, result)

    def test_006_anysimpletype(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'anysimpletype'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            'anysimpletype1_sup.py',
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('anysimpletype1_sub.py', '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_007_simpletype_memberspecs(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'simpletype_memberspecs'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_008_extensions(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'extensions'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_009_literal(self):
        cmd = (
            'python generateDS.py --no-dates --no-versions -f '
            '-o tests/out2_sup.py -s tests/out2_sub.py '
            '--export="write literal" '
            '--super=out2_sup -u gends_user_methods tests/people.xsd'
        )
        self.executeClean(cmd, cwd='..')
        import out2_sup
        save_stdout = sys.stdout
        sys.stdout = open('literal2.py', 'w')
        out2_sup.parseLiteral('people.xml')
        sys.stdout.close()
        sys.stdout = save_stdout
        infile = open('literal1.py', 'r')
        content1 = infile.read()
        infile.close()
        infile = open('literal2.py', 'r')
        content2 = infile.read()
        infile.close()
        self.failUnlessEqual(content1, content2)
        # cleanup generated files
        self.remove('literal2.py')
        self.remove('out2_sup.py')
        self.remove('out2_sub.py')

    def test_010_simplecontent_restriction(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'simplecontent_restriction'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_011_annotations(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'annotations'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_012_abstract_type(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'abstract_type'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_013_people_procincl(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'people_procincl'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    #
    # Also perform a test of passing namespace to child exports.
    def test_014_ipo(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup tests/%s.xsd'
        )
        t_ = 'ipo'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_out.xml'.format(t_))
        cmdTempl = ('python -c "import {0}_test_namespace; '
                    '{0}_test_namespace.export(\'{0}2_namespace_out.xml\')"')
        cmd = cmdTempl.format(t_)
        result, err = self.execute(cmd)
        self.compareFiles(
            '{}1_namespace_out.xml'.format(t_),
            '{}2_namespace_out.xml'.format(t_))

    def test_015_recursive_simpletype(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'recursive_simpletype'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_016_anywildcard(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'anywildcard'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_017_attr_groups(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'attr_groups'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_018_simpletypes_other(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'simpletypes_other'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_019_to_etree(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--export="etree" --silence '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'to_etree'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        import to_etree2_sup
        rootObj, rootElement, mapping, reverse_mapping = \
            to_etree2_sup.parseEtree('to_etree.xml')
        content = etree.tostring(
            rootElement, pretty_print=True,
            xml_declaration=True, encoding="utf-8")
        outfile = open('to_etree2.xml', 'w')
        if sys.version_info.major != 2:
            content = content.decode()
        outfile.write(content)
        outfile.close()
        self.compareFiles('{}1.xml'.format(t_), '{}2.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2.xml'.format(t_))

    def test_020_catalogtest(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            '-c tests/catalog.xml '
            'tests/%s.xsd'
        )
        t_ = 'catalogtest'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_021_anonymous_type(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'anonymous_type'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_022_one_per(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '--one-file-per-xsd --output-directory="tests/OnePer" '
            '--module-suffix="One" '
            '--super=%s2_sup '
            'tests/%s00.xsd'
        )
        t_ = 'oneper'
        cmd = cmdTempl % (t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            'OnePer{}{}Type00_1One.py'.format(os.sep, t_),
            'OnePer{}{}Type00_2One.py'.format(os.sep, t_),
            ('sys.stdout.write',))
        self.compareFiles(
            'OnePer{}{}Type01_1One.py'.format(os.sep, t_),
            'OnePer{}{}Type01_2One.py'.format(os.sep, t_),
            ('sys.stdout.write',))
        self.compareFiles(
            'OnePer{}{}Type02_1One.py'.format(os.sep, t_),
            'OnePer{}{}Type02_2One.py'.format(os.sep, t_),
            ('sys.stdout.write',))
        self.compareFiles(
            'OnePer{}{}Type03_1One.py'.format(os.sep, t_),
            'OnePer{}{}Type03_2One.py'.format(os.sep, t_),
            ('sys.stdout.write',))
        # cleanup generated files
        self.remove('OnePer{}{}Type00_1One.py'.format(os.sep, t_))
        self.remove('OnePer{}{}Type01_1One.py'.format(os.sep, t_))
        self.remove('OnePer{}{}Type02_1One.py'.format(os.sep, t_))
        self.remove('OnePer{}{}Type03_1One.py'.format(os.sep, t_))

    def test_023_mapcleanname(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'mapcleanname'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_024_prefix_classname(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '-p tomato_ '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'prefix_classname'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    def test_025_validate_simpletypes(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            '--external-encoding="utf-8" '
            'tests/%s.xsd'
        )
        t_ = 'validate_simpletypes'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = (
            'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml '
            '2> tests/%s2_warnings.txt'
        )
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        self.compareFiles(
            '{}1_warnings.txt'.format(t_), '{}2_warnings.txt'.format(t_))
        # cleanup generated files
        self.remove('{}2_out.xml'.format(t_))
        self.remove('{}2_warnings.txt'.format(t_))

    def test_026_reference_simpletype(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'reference_simpletype'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_027_cdata(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--silence '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'cdata'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))

        import cdata2_sup as cdatalib
        cdatalist = cdatalib.cdataListType()
        cdata1 = cdatalib.cdataType()
        cdata1.set_script("<![CDATA[ccc < ddd & eee]]>")
        cdatalist.add_cdatalist(cdata1)
        cdata2 = cdatalib.cdataType()
        cdata2.set_script(
            "aaa < bbb <![CDATA[ccc < ddd]]> eee < & fff" +
            "<<![CDATA[ggg < & hhh]]>& iii < jjj"
        )
        cdatalist.add_cdatalist(cdata2)
        with open('%s2.xml' % t_, 'w') as outfile:
            cdatalist.export(outfile, 0)
        self.compareFiles('{}1.xml'.format(t_), '{}2.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2.xml'.format(t_))

    def test_028_defaults_coverage(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'defaults_coverage'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_029_defaults_cases(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'defaults_cases'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    def test_030_nested_def(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'nested_def'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # Need to preserve generated files for next command, cleanup at end
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    #
    # Test enhancements to cleanupName function.
    def test_031_cleanupname(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--silence --member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            "--cleanup-name-list=\"[('[-:.]', '_'), "
            "('^Type', 'Class'), "
            "('Type$', 'Kind'), "
            "('[ABC]', 'M'), "
            "('[XYZ]', 'N'), "
            "]\" "
            'tests/%s.xsd'
        )
        t_ = 'cleanupname'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))

    def test_032_rem_dup_elems(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f -a "xsd:" '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup --no-warnings '
            'tests/%s.xsd'
        )
        t_ = 'rem_dup_elems'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # Need to preserve generated files for next command, cleanup at end
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    def test_033_disable_xml_super(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--disable-xml --disable-generatedssuper-lookup '
            '--member-specs=list -f -a "xsd:" '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup --no-warnings '
            'tests/%s.xsd'
        )
        t_ = 'disable_xml_super'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # Need to preserve generated files for next command, cleanup at end
        # cleanup generated files
        #self.remove('{}2_sup.py'.format(t_))
        #self.remove('{}2_sub.py'.format(t_))
        #self.remove('{}2_out.xml'.format(t_))

    def test_034_mixedcontent(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            'tests/%s.xsd'
        )
        t_ = 'mixedcontent'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # Need to preserve generated files for next command, cleanup at end
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    def test_035_defaults_cases_always(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            '--always-export-default '
            'tests/%s.xsd'
        )
        t_ = 'defaults_cases_always'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    #
    # Test for command line option --no-namespace-defs.
    def test_036_no_namespace_defs(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--disable-xml --disable-generatedssuper-lookup '
            '--member-specs=list -f -a "xsd:" '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup --no-warnings '
            'tests/%s.xsd'
        )
        t_ = 'no_namespace_defs'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        # Need to preserve generated files for next command, cleanup at end
        # cleanup generated files
        #self.remove('{}2_sup.py'.format(t_))
        #self.remove('{}2_sub.py'.format(t_))
        #self.remove('{}2_out.xml'.format(t_))

    #
    # Test for types derived by extension.  See:
    # https://www.w3.org/TR/2004/REC-xmlschema-0-20041028/#DerivExt
    def test_037_derived_types(self):
        cmdTempl = (
            'python generateDS.py --no-dates --no-versions '
            '--member-specs=list -f '
            '-o tests/%s2_sup.py -s tests/%s2_sub.py '
            '--super=%s2_sup '
            '--always-export-default '
            'tests/%s.xsd'
        )
        t_ = 'derived_types'
        cmd = cmdTempl % (t_, t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            '{}1_sup.py'.format(t_),
            '{}2_sup.py'.format(t_),
            ('sys.stdout.write',))
        self.compareFiles('{}1_sub.py'.format(t_), '{}2_sub.py'.format(t_))
        cmdTempl = 'python tests/%s2_sup.py tests/%s.xml > tests/%s2_out.xml'
        cmd = cmdTempl % (t_, t_, t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles('{}1_out.xml'.format(t_), '{}2_out.xml'.format(t_))
        # cleanup generated files
        self.remove('{}2_sup.py'.format(t_))
        self.remove('{}2_sub.py'.format(t_))
        self.remove('{}2_out.xml'.format(t_))

    def test_038_enum_import(self):
        cmdTempl = (
            'python generateDS.py --disable-generatedssuper-lookup '
            '--disable-xml --no-dates --no-versions '
            '--silence --member-specs=dict -f '
            '--one-file-per-xsd --output-directory="tests/EnumImport" '
            '--use-source-file-as-module-name '
            'tests/%s00.xsd'
        )
        t_ = 'enum_import'
        cmd = cmdTempl % (t_, )
        self.executeClean(cmd, cwd='..')
        self.compareFiles(
            'EnumImport{}{}00.py'.format(os.sep, t_),
            'EnumImport{}{}00_2.py'.format(os.sep, t_),
        )
        self.compareFiles(
            'EnumImport{}{}01.py'.format(os.sep, t_),
            'EnumImport{}{}01_2.py'.format(os.sep, t_),
        )
        self.compareFiles(
            'EnumImport{}{}02.py'.format(os.sep, t_),
            'EnumImport{}{}02_2.py'.format(os.sep, t_)
        )
        cmd = 'python test_generated_code.py'
        self.execute(cmd, cwd='./EnumImport')
        # cleanup generated files
        self.remove('EnumImport{}{}Type00.py'.format(os.sep, t_))
        self.remove('EnumImport{}{}Type01.py'.format(os.sep, t_))
        self.remove('EnumImport{}{}Type02.py'.format(os.sep, t_))

    def compareFiles(self, left, right, ignore=None):
        with open(left) as left_file:
            with open(right) as right_file:
                lf = strip_build_comments(left_file.readlines())
                rf = strip_build_comments(right_file.readlines())
                diffs = difflib.unified_diff(lf, rf)
        diffs = list(diffs)
        if diffs:
            diffs = ''.join(diffs[2:12])
            self.fail("Files '{}' and '{}' differed:\n{}".format(
                left, right, diffs))

    def remove(self, filename):
        if False:
            os.remove(filename)


def strip_build_comments(lines):
    """
    Remove lines in Python file which may vary on different systems.
    """
    assert isinstance(lines, list), type(lines)
    if '#!/usr/bin/env python' in lines[0]:

        # This line contains sometimes package version
        n = 3 + int('coding: utf-8' in lines[1])
        assert lines[n].startswith('# Generated '), repr(lines[n])
        del lines[n]

        # Next line contains Python version and build information
        assert lines[n].startswith('# Python '), repr(lines[n])
        del lines[n]

        # Another line assumes we have certain name for directory
        n = lines.index('# Current working directory (os.getcwd()):\n')
        del lines[n + 1]

    return lines


# Make the test suite.
def suite():
    # The following is obsolete.  See Lib/unittest.py.
    #return unittest.makeSuite(GenTest)
    suite = unittest.TestSuite()
    loader = unittest.defaultTestLoader
    testsuite1 = loader.loadTestsFromTestCase(GenTest)
    from EnumImport.test_generated_code import EnumTest
    testsuite2 = loader.loadTestsFromTestCase(EnumTest)
    suite.addTests([
        testsuite1,
        testsuite2,
    ])
    return suite


# Make the test suite and run the tests.
def test():
    testsuite = suite()
    runner = unittest.TextTestRunner(sys.stdout, verbosity=2)
    runner.run(testsuite)


USAGE_TEXT = """
Usage:
    python test.py [options]
Options:
    -h, --help      Display this help message.
Example:
    python test.py
"""


def usage():
    print(USAGE_TEXT)
    sys.exit(-1)


def main():
    args = sys.argv[1:]
    try:
        opts, args = getopt.getopt(args, 'h', ['help'])
    except getopt.GetoptError:
        usage()
    for opt, val in opts:
        if opt in ('-h', '--help'):
            usage()
    if len(args) != 0:
        usage()
    test()


if __name__ == '__main__':
    main()
    #import pdb
    #pdb.run('main()')
