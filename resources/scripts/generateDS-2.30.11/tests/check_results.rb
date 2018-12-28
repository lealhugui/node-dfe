#!/usr/bin/env ruby

#
# Unit tests -- 
# Step 1: Run the unit tests: ``./test.py``
# Step 2: If there are errors, run this script to view the differences.
#
# When adding a new unit test, also add lines to the list $commands.
#

$divider = "-" * 70

$commands = [
  "diff -u out1_sub.py out2_sub.py",
  "diff -u out1_sup.py out2_sup.py",
  "diff -u anysimpletype1_sub.py anysimpletype2_sub.py",
  "diff -u anysimpletype1_sup.py anysimpletype2_sup.py",
  "diff -u simpletype_memberspecs1_sub.py simpletype_memberspecs2_sub.py",
  "diff -u simpletype_memberspecs1_sup.py simpletype_memberspecs2_sup.py",
  "diff -u extensions1_sub.py extensions2_sub.py",
  "diff -u extensions1_sup.py extensions2_sup.py",
  "diff -u simplecontent_restriction1_sub.py simplecontent_restriction2_sub.py",
  "diff -u simplecontent_restriction1_sup.py simplecontent_restriction2_sup.py",
  "diff -u annotations1_sub.py annotations2_sub.py",
  "diff -u annotations1_sup.py annotations2_sup.py",
  "diff -u abstract_type1_sub.py abstract_type2_sub.py",
  "diff -u abstract_type1_sup.py abstract_type2_sup.py",
  "diff -u people_procincl1_sub.py people_procincl2_sub.py",
  "diff -u people_procincl1_sup.py people_procincl2_sup.py",
  "diff -u ipo1_sub.py ipo2_sub.py",
  "diff -u ipo1_sup.py ipo2_sup.py",
  "diff -u recursive_simpletype1_sub.py recursive_simpletype2_sub.py",
  "diff -u recursive_simpletype1_sup.py recursive_simpletype2_sup.py",
  "diff -u anywildcard1_sub.py anywildcard2_sub.py",
  "diff -u anywildcard1_sup.py anywildcard2_sup.py",
  "diff -u attr_groups1_sub.py attr_groups2_sub.py",
  "diff -u attr_groups1_sup.py attr_groups2_sup.py",
  "diff -u simpletypes_other1_sub.py simpletypes_other2_sub.py",
  "diff -u simpletypes_other1_sup.py simpletypes_other2_sup.py",
  "diff -u to_etree1_sub.py to_etree2_sub.py",
  "diff -u to_etree1_sup.py to_etree2_sup.py",
  "diff -u anonymous_type1_sub.py anonymous_type2_sub.py",
  "diff -u anonymous_type1_sup.py anonymous_type2_sup.py",
  "diff -u mapcleanname1_sub.py mapcleanname2_sub.py",
  "diff -u mapcleanname1_sup.py mapcleanname2_sup.py",
  "diff -u prefix_classname1_sub.py prefix_classname2_sub.py",
  "diff -u prefix_classname1_sup.py prefix_classname2_sup.py",
  "diff -u validate_simpletypes1_sub.py validate_simpletypes2_sub.py",
  "diff -u validate_simpletypes1_sup.py validate_simpletypes2_sup.py",
  "diff -u validate_simpletypes1_warnings.txt validate_simpletypes2_warnings.txt",
  "diff -u reference_simpletype1_sub.py reference_simpletype2_sub.py",
  "diff -u reference_simpletype1_sup.py reference_simpletype2_sup.py",
  "diff -u OnePer/oneperType00_2One.py OnePer/oneperType00_1One.py",
  "diff -u OnePer/oneperType01_2One.py OnePer/oneperType01_1One.py",
  "diff -u OnePer/oneperType02_2One.py OnePer/oneperType02_1One.py",
  "diff -u OnePer/oneperType03_2One.py OnePer/oneperType03_1One.py",
  "diff -u cdata1_sub.py cdata2_sub.py",
  "diff -u cdata1_sup.py cdata2_sup.py",
  "diff -u cdata1.xml cdata2.xml",
  "diff -u defaults_coverage1_sub.py defaults_coverage2_sub.py",
  "diff -u defaults_coverage1_sup.py defaults_coverage2_sup.py",
  "diff -u defaults_cases1_sub.py defaults_cases2_sub.py",
  "diff -u defaults_cases1_sup.py defaults_cases2_sup.py",
  "diff -u defaults_cases_always1_sub.py defaults_cases_always2_sub.py",
  "diff -u defaults_cases_always1_sup.py defaults_cases_always2_sup.py",
  "diff -u cleanupname1_sub.py cleanupname2_sub.py",
  "diff -u cleanupname1_sup.py cleanupname2_sup.py",
  "diff -u rem_dup_elems1_sub.py rem_dup_elems2_sub.py",
  "diff -u rem_dup_elems1_sup.py rem_dup_elems2_sup.py",
  "diff -u nested_def1_sub.py nested_def2_sub.py",
  "diff -u nested_def1_sup.py nested_def2_sup.py",
  "diff -u catalogtest1_sub.py catalogtest2_sub.py",
  "diff -u catalogtest1_sup.py catalogtest2_sup.py",
  "diff -u disable_xml_super1_sub.py disable_xml_super2_sub.py",
  "diff -u disable_xml_super1_sup.py disable_xml_super2_sup.py",
  "diff -u mixedcontent1_sub.py mixedcontent2_sub.py",
  "diff -u mixedcontent1_sup.py mixedcontent2_sup.py",
]

def check
  #puts $divider
  error_count = 0
  $commands.each do |command|
    infile = IO.popen command
    has_content = false
    infile.each_line do |line|
      puts line
      has_content = true
    end
    infile.close
    if has_content
      puts $divider
      error_count += 1
    end
  end
  puts "Error count: #{error_count}"
end

def main
  check
end

if __FILE__ == $0                                                                   
  main()                                                                            
end                                                                                 
