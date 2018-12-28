#!/usr/bin/python
import sys
import os
from optparse import OptionParser
from configparser import ConfigParser
from xml.parsers import expat
import subprocess
import re
import locale
import gettext


if sys.version_info.major == 2:
    import gtk
else:
    # https://sourceforge.net/projects/pygobjectwin32/files/
    # https://blogs.gnome.org/kittykat/2014/01/29/developing-gtk-3-apps-with-python-on-windows/
    import gi
    gi.require_version('Gtk', '3.0')
    from gi.repository import Gtk as gtk

# import pango
from libgenerateDS.gui import generateds_gui_session
#import generateds_gui_session

## import warnings
## warnings.warn('importing IPShellEmbed', UserWarning)
## from IPython.Shell import IPShellEmbed
## args = ''
## ipshell = IPShellEmbed(args,
##     banner = 'Dropping into IPython',
##     exit_msg = 'Leaving Interpreter, back to program.')
##
# Then use the following line where and when you want to drop into the
# IPython shell:
#    ipshell('<some message> -- Entering ipshell.\\nHit Ctrl-D to exit')

# Globals and constants:

#
# Do not modify the following VERSION comments.
# Used by updateversion.py.
##VERSION##
VERSION = '2.30.11'
##VERSION##


Builder = None
ParamNameList = []
CmdTemplate = (
    '%(exec_path)s --no-questions' +
    '%(force)s' +
    '%(output_superclass)s' +
    '%(output_subclass)s' +
    '%(prefix)s' +
    '%(namespace_prefix)s' +
    '%(behavior_filename)s' +
    '%(properties)s' +
    '%(old_getters_setters)s' +
    '%(subclass_suffix)s' +
    '%(root_element)s' +
    '%(superclass_module)s' +
    '%(validator_bodies)s' +
    '%(user_methods)s' +
    '%(no_dates)s' +
    '%(no_versions)s' +
    '%(no_process_includes)s' +
    '%(silence)s' +
    '%(namespace_defs)s' +
    '%(external_encoding)s' +
    '%(member_specs)s' +
    '%(export_spec)s' +
    '%(one_file_per_xsd)s' +
    '%(output_directory)s' +
    '%(module_suffix)s' +
    '%(preserve_cdata_tags)s' +
    '%(cleanup_name_list)s' +
    ' %(input_schema)s' +
    ''
)
CaptureCmdTemplate = (
    '%(exec_path)s --no-questions' +
    '%(force)s' +
    '%(properties)s' +
    '%(namespace_prefix)s' +
    '%(output_superclass)s' +
    '%(output_subclass)s' +
    '%(prefix)s' +
    '%(behavior_filename)s' +
    '%(old_getters_setters)s' +
    '%(subclass_suffix)s' +
    '%(root_element)s' +
    '%(superclass_module)s' +
    '%(validator_bodies)s' +
    '%(user_methods)s' +
    '%(no_dates)s' +
    '%(no_versions)s' +
    '%(no_process_includes)s' +
    '%(silence)s' +
    '%(namespace_defs)s' +
    '%(external_encoding)s' +
    '%(member_specs)s' +
    '%(export_spec)s' +
    '%(one_file_per_xsd)s' +
    '%(output_directory)s' +
    '%(module_suffix)s' +
    '%(preserve_cdata_tags)s' +
    '%(cleanup_name_list)s' +
    ' \\\n    %(input_schema)s' +
    ''
)
ErrorMessages = [
    '',
    'Must enter input schema name.',
    'Must enter either output superclass name or output subclass file name.',
]
Memberspecs_tooltip_text = '''\
Generate member (type) specifications in each
class: a dictionary of instances of class
MemberSpec_ containing member name, type,
and array or not.  Allowed values are
"list" or "dict".  Default: None.
'''


#
# Classes
#

class UIItemSpec(object):
    def __init__(self, name='', ui_type='', access_action=''):
        self.name = name
        self.ui_type = ui_type
        self.access_action = access_action

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_ui_type(self):
        return self.ui_type

    def set_ui_type(self, ui_type):
        self.ui_type = ui_type

    def get_access_action(self):
        return self.access_action

    def set_access_action(self, access_action):
        self.access_action = access_action


class GeneratedsGui(object):

    def __init__(self, options):
        global Builder
        # Default values
        Builder = gtk.Builder()
        Builder.set_translation_domain('generateds_gui')
        self.options = options
        # self.ui_spec_filename = ui_spec_filename
        self.filename = None
        self.about_dialog = None
        self.params = generateds_gui_session.sessionType()
        self.ui_obj_dict = {}
        self.session_filename = None
        self.current_folder = None
        # use GtkBuilder to build our interface from the XML file
        ui_spec_filename = options.impl_gui
        try:
            if ui_spec_filename is None:
                Builder.add_from_string(branch_version(
                    'Ui_spec, len(Ui_spec)', 'Ui_spec'))
            else:
                Builder.add_from_file(ui_spec_filename)
        except:
            msg = "Failed to load UI XML file: %s" % ui_spec_filename
            self.error_message(msg)
            sys.exit(1)
        # get the widgets which will be referenced in callbacks
        bgo = Builder.get_object
        self.window = bgo("window1")
        self.statusbar = bgo("statusbar1")
        for item in ParamNameList:
            if item.get_ui_type() != 'combobox':
                s1 = '%s_%s' % (item.get_name(), item.get_ui_type(), )
                setattr(self, s1, bgo(s1))
                self.ui_obj_dict[s1] = bgo(s1)
        # Create the member-specs combobox.
        member_specs_combobox = branch_version(
            'gtk.combo_box_new_text()', 'gtk.ComboBoxText()')
        member_specs_combobox.set_name('member_specs_combobox')
        member_specs_combobox.set_tooltip_text(Memberspecs_tooltip_text)
        self.ui_obj_dict['member_specs_combobox'] = member_specs_combobox
        member_specs_combobox.append_text("none")
        member_specs_combobox.append_text("list")
        member_specs_combobox.append_text("dict")
        member_specs_combobox_container = bgo(
            'member_specs_combobox_container')
        member_specs_combobox_container.add(member_specs_combobox)
        member_specs_combobox.set_active(0)
        member_specs_combobox.show()
        self.content_dialog = ContentDialog()
        # connect signals
        Builder.connect_signals(self)
        Builder.connect_signals(self.content_dialog)
        # set the default icon to the GTK "edit" icon
        branch_version(
            'gtk.window_set_default_icon_name(gtk.STOCK_EDIT)',
            'gtk.Window.set_default_icon_name(gtk.STOCK_EDIT)')
        # setup and initialize our statusbar
        self.statusbar_cid = self.statusbar.get_context_id(
            "Tutorial GTK+ Text Editor")
        self.reset_default_status()
        self.params = generateds_gui_session.sessionType()
        # Load a session if specified.
        session = self.options.session
        if session:
            session = os.path.abspath(session)
            self.session_filename = session
            self.load_session(session)
            msg = 'Session file: %s' % (self.session_filename, )
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, msg)
        else:
            self.trans_gui_2_obj()
            self.saved_params = self.params.copy()

    # When our window is destroyed, we want to break out of the GTK main loop.
    # We do this by calling gtk_main_quit(). We could have also just specified
    # gtk_main_quit as the handler in Glade!
    def on_window_destroy(self, widget, data=None):
        self.trans_gui_2_obj()
##         self.dump_params('saved_params:', self.saved_params)
##         self.dump_params('params:', self.params)
        if self.params != self.saved_params:
            message = 'Session data has changed.\n\nSave?'
            if sys.version_info.major == 2:
                dialog = gtk.MessageDialog(
                    None,
                    gtk.DIALOG_MODAL | gtk.DIALOG_DESTROY_WITH_PARENT,
                    gtk.MESSAGE_ERROR,
                    gtk.BUTTONS_NONE,
                    message)
                dialog.add_buttons(
                    gtk.STOCK_YES, gtk.RESPONSE_YES,
                    '_Discard', 1,
                    gtk.STOCK_CANCEL, gtk.RESPONSE_CANCEL,
                )
            else:
                dialog = gtk.MessageDialog(
                    None,
                    (gtk.DialogFlags.MODAL |
                        gtk.DialogFlags.DESTROY_WITH_PARENT),
                    gtk.MessageType.ERROR,
                    gtk.ButtonsType.NONE,
                    message)
                dialog.add_buttons(
                    gtk.STOCK_YES, gtk.ResponseType.YES,
                    '_Discard', 1,
                    gtk.STOCK_CANCEL, gtk.ResponseType.CANCEL,
                )
            response = dialog.run()
            dialog.destroy()
            if response == branch_version(
                    'gtk.RESPONSE_YES', 'gtk.ResponseType.YES'):
                self.save_session_action()
            elif response == 1:
                pass
            elif response == branch_version(
                    'gtk.RESPONSE_CANCEL', 'gtk.ResponseType.CANCEL'):
                return
        gtk.main_quit()

    def on_window_delete_event(self, widget, event, data=None):
        self.on_window_destroy(widget, data)

    def on_quit_menu_item_activate(self, widget, data=None):
        self.on_window_destroy(widget, data)

    def on_quit_button_clicked(self, widget, data=None):
        self.on_window_destroy(widget, data)

    # Get the values from the widgets in the UI.
    # Format the command line.
    # Generate the output files.
    def on_generate_menuitem_activate(self, menuitem, data=None):
        self.trans_gui_2_obj()
        params_dict = self.trans_params_2_dict()
        result, msg = self.validate_params(params_dict)
        if result:
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, 'Error: %s' % (msg, ))
            self.error_message(msg)
        else:
            cmd = self.create_command_line(params_dict, CmdTemplate)
            #print 'cmd: %s' % (cmd, )
            self.run_command(cmd)
        return True

    on_generate_button_clicked = on_generate_menuitem_activate

    def on_capture_cl_menuitem_activate(self, menuitem, data=None):
        self.trans_gui_2_obj()
        params_dict = self.trans_params_2_dict()
        result, msg = self.validate_params(params_dict)
        if result:
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, 'Error: %s' % (msg, ))
            self.error_message(msg)
        else:
            cmd = self.create_command_line(params_dict, CaptureCmdTemplate)
            cmd = cmd.replace(' --', ' \\\n    --')
            cmd = cmd.replace(' -o', ' \\\n    -o')
            cmd = cmd.replace(' -s', ' \\\n    -s')
            cmd = cmd.replace(' -f', ' \\\n    -f')
            cmd = cmd.replace(' -m', ' \\\n    -m')
            self.display_content('Command line', cmd)
        return True

    def trans_gui_2_obj(self):
        for item in ParamNameList:
            ui_name = '%s_%s' % (item.get_name(), item.get_ui_type(), )
            ui_obj = self.ui_obj_dict[ui_name]
            if ui_obj is not None:
                if item.get_name() == 'member_specs':
                    value = ui_obj.get_active()
                    if value == 1:
                        self.params.set_member_specs('list')
                    elif value == 2:
                        self.params.set_member_specs('dict')
                    else:
                        self.params.set_member_specs('none')
                else:
                    #s2 = '%s_%s' % (item.get_name(), item.get_ui_type(), )
                    method = getattr(
                        ui_obj, 'get_%s' % item.get_access_action())
                    value = method()
                    setattr(self.params, item.get_name(), value)

    def trans_obj_2_gui(self):
        for item in ParamNameList:
            ui_name = '%s_%s' % (item.get_name(), item.get_ui_type(), )
            ui_obj = self.ui_obj_dict[ui_name]
            if ui_obj is not None:
                if item.get_name() == 'member_specs':
                    if self.params.get_member_specs() == 'list':
                        ui_obj.set_active(1)
                    elif self.params.get_member_specs() == 'dict':
                        ui_obj.set_active(2)
                    else:
                        ui_obj.set_active(0)
                else:
                    value = getattr(self.params, item.get_name())
                    if value is None:
                        if item.get_ui_type() == 'entry':
                            value = ''
                        elif item.get_ui_type() == 'checkbutton':
                            value = False
                        elif item.get_ui_type() == 'combobox':
                            value = 0
                    method = getattr(
                        ui_obj,
                        'set_%s' % item.get_access_action())
                    method(value)

    def dump_params(self, msg, params):
        print(msg)
        params.export(sys.stdout, 0, name_='session')

    def trans_params_2_dict(self):
        params = self.params
        params_dict = {}
        pd = params_dict
        pd['input_schema'] = getattr(params, 'input_schema')
        self.transform_1_param(params, pd, 'output_superclass', 'o')
        self.transform_1_param(params, pd, 'output_subclass', 's')
        pd['force'] = (' -f' if params.get_force() else '')
        self.transform_1_param(params, pd, 'prefix', 'p')
        if params.get_empty_namespace_prefix():
            pd['namespace_prefix'] = ' -a ""'
        else:
            self.transform_1_param(params, pd, 'namespace_prefix', 'a')
        self.transform_1_param(params, pd, 'behavior_filename', 'b')
        pd['properties'] = (' -m' if params.get_properties() else '')
        self.transform_1_param(
            params, pd, 'subclass_suffix', 'subclass-suffix', True)
        self.transform_1_param(
            params, pd, 'root_element', 'root-element', True)
        self.transform_1_param(
            params, pd, 'superclass_module', 'super', True)
        pd['old_getters_setters'] = (
            ' --use-old-getter-setter'
            if params.get_old_getters_setters()
            else '')
        self.transform_1_param(
            params, pd, 'user_methods', 'user-methods', True)
        self.transform_1_param(
            params, pd, 'validator_bodies', 'validator-bodies', True)
        pd['no_dates'] = (' --no-dates' if params.get_no_dates() else '')
        pd['no_versions'] = (
            ' --no-versions' if params.get_no_versions() else '')
        pd['no_process_includes'] = (
            ' --no-process-includes'
            if params.get_no_process_includes()
            else '')
        pd['silence'] = (' --silence' if params.get_silence() else '')
        # Special case for namespacedefs because of quoting.
        name = 'namespace_defs'
        flag = 'namespacedef'
        value = getattr(params, name)
        params_dict[name] = (
            " --%s='%s'" % (flag, value, )
            if value.strip()
            else '')
        self.transform_1_param(
            params, pd, 'external_encoding', 'external-encoding', True)
        if params.get_member_specs() == 'list':
            pd['member_specs'] = ' --member-specs=list'
        elif params.get_member_specs() == 'dict':
            pd['member_specs'] = ' --member-specs=dict'
        else:
            pd['member_specs'] = ''
        self.transform_1_param(
            params, pd, 'export_spec', 'export', True)
        pd['one_file_per_xsd'] = (
            ' --one-file-per-xsd' if params.get_one_file_per_xsd() else '')
        self.transform_1_param(
            params, pd, 'output_directory', 'output-directory', True)
        self.transform_1_param(
            params, pd, 'module_suffix', 'module-suffix', True)
        pd['preserve_cdata_tags'] = (
            ' --preserve-cdata-tags'
            if params.get_preserve_cdata_tags()
            else '')
        self.transform_1_param(
            params, pd, 'cleanup_name_list', 'cleanup-name-list', True)
        return pd

    def transform_1_param(
            self, params, params_dict, name, flag, longopt=False):
        value = getattr(params, name)
        if longopt:
            params_dict[name] = (
                ' --%s="%s"' % (flag, value, )
                if value.strip()
                else '')
        else:
            params_dict[name] = (
                ' -%s "%s"' % (flag, value, )
                if value.strip()
                else '')

    def create_command_line(self, params_dict, template):
        params_dict['exec_path'] = self.options.exec_path
        cmd = template % params_dict
        return cmd

    def validate_params(self, params_dict):
        p = params_dict
        #print sorted(p.keys())
        result = 0
        msg = ''
        if not p['input_schema']:
            result = 1
        elif not (p['output_superclass'] or p['output_subclass']):
            result = 2
        if result:
            msg = ErrorMessages[result]
        return result, msg

    # Clear all the fields/widgets to default values.
    def on_clear_menuitem_activate(self, menuitem, data=None):
        message = 'Clear all entries?\nAre you sure?'

        if sys.version_info.major == 2:
            dialog = gtk.MessageDialog(
                None,
                gtk.DIALOG_MODAL | gtk.DIALOG_DESTROY_WITH_PARENT,
                gtk.MESSAGE_WARNING,
                gtk.BUTTONS_OK_CANCEL,
                message
            )
        else:
            dialog = gtk.MessageDialog(
                None,
                gtk.DialogFlags.MODAL | gtk.DialogFlags.DESTROY_WITH_PARENT,
                gtk.MessageType.WARNING,
                gtk.ButtonsType.OK_CANCEL,
                message
            )
        response = dialog.run()
        dialog.destroy()
        if response == branch_version(
                'gtk.RESPONSE_OK', 'gtk.ResponseType.OK'):
            self.session_filename = None
            self.params = generateds_gui_session.sessionType(
                input_schema='',
                output_superclass='',
                output_subclass='',
                force=False,
                prefix='',
                namespace_prefix='',
                empty_namespace_prefix=False,
                behavior_filename='',
                properties=False,
                subclass_suffix='',
                root_element='',
                superclass_module='',
                auto_super=False,
                old_getters_setters=False,
                validator_bodies='',
                user_methods='',
                no_dates=False,
                no_versions=False,
                no_process_includes=False,
                silence=False,
                namespace_defs='',
                external_encoding='',
                member_specs='',
                export_spec='',
                one_file_per_xsd=False,
                output_directory='',
                module_suffix='',
                preserve_cdata_tags=False,
                cleanup_name_list='',
            )
            self.trans_obj_2_gui()

    def run_command(self, cmd):
        spobj = subprocess.Popen(
            cmd,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            close_fds=False)
        outcontent = spobj.stdout.read()
        errcontent = spobj.stderr.read()
        error = False
        if outcontent.strip():
            self.display_content('Messages', outcontent)
            error = True
        if errcontent.strip():
            self.display_content('Errors', errcontent)
            error = True
        if not error:
            msg = 'Successfully generated.'
            self.error_message(
                msg,
                branch_version('gtk.MESSAGE_INFO', 'gtk.MessageType.INFO'))

    def display_content(self, title, content):
        #content_dialog = ContentDialog()
        self.content_dialog.show(content)

    def on_open_session_menuitem_activate(self, menuitem, data=None):
        self.trans_gui_2_obj()
##         self.dump_params('saved_params:', self.saved_params)
##         self.dump_params('params:', self.params)
        if self.params != self.saved_params:
            message = 'Session data has changed.\n\nSave?'
            if sys.version_info.major == 2:
                dialog = gtk.MessageDialog(
                    None,
                    gtk.DIALOG_MODAL | gtk.DIALOG_DESTROY_WITH_PARENT,
                    gtk.MESSAGE_ERROR,
                    gtk.BUTTONS_NONE,
                    message)
                dialog.add_buttons(
                    gtk.STOCK_YES, gtk.RESPONSE_YES,
                    '_Discard', 1,
                    gtk.STOCK_CANCEL, gtk.RESPONSE_CANCEL,
                )
            else:
                dialog = gtk.MessageDialog(
                    None,
                    (gtk.DialogFlags.MODAL |
                        gtk.DialogFlags.DESTROY_WITH_PARENT),
                    gtk.MessageType.ERROR,
                    gtk.ButtonsType.NONE,
                    message)
                dialog.add_buttons(
                    gtk.STOCK_YES, gtk.ResponseType.YES,
                    '_Discard', 1,
                    gtk.STOCK_CANCEL, gtk.ResponseType.CANCEL,
                )
            response = dialog.run()
            dialog.destroy()
            if response == branch_version(
                    'gtk.RESPONSE_YES', 'gtk.ResponseType.YES'):
                self.save_session_action()
            elif response == 1:
                pass
            elif response == branch_version(
                    'gtk.RESPONSE_CANCEL', 'gtk.ResponseType.CANCEL'):
                return
        session_filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_OPEN',
                'gtk.FileChooserAction.OPEN'),
            (('Session *.session', '*.session'),)
        )
        if session_filename:
            self.session_filename = session_filename
            self.load_session(self.session_filename)
            msg = 'Session file: %s' % (self.session_filename, )
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, msg)

    def on_save_session_menuitem_activate(self, menuitem, data=None):
        self.save_session_action()

    def save_session_action(self):
        if not self.session_filename:
            filename = self.choose_filename(
                branch_version(
                    'gtk.FILE_CHOOSER_ACTION_SAVE',
                    'gtk.FileChooserAction.SAVE'),
                (('Session *.session', '*.session'),),
                confirm_overwrite=True,
                initfilename=self.session_filename,
                buttons=(
                    gtk.STOCK_CANCEL,
                    branch_version(
                        'gtk.RESPONSE_CANCEL',
                        'gtk.ResponseType.CANCEL'),
                    gtk.STOCK_SAVE, branch_version(
                        'gtk.RESPONSE_OK',
                        'gtk.ResponseType.OK'),
                )
            )
            if filename:
                self.session_filename = filename
        if self.session_filename:
            stem, ext = os.path.splitext(self.session_filename)
            if not ext:
                self.session_filename += '.session'
            self.save_session(self.session_filename)
            msg = 'Session file: %s' % (self.session_filename, )
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, msg)

    def on_save_session_as_menuitem_activate(self, menuitem, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_SAVE',
                'gtk.FileChooserAction.SAVE'),
            (('Session *.session', '*.session'),),
            confirm_overwrite=True,
            initfilename=self.session_filename,
            buttons=(
                gtk.STOCK_CANCEL,
                branch_version(
                    'gtk.RESPONSE_CANCEL',
                    'gtk.ResponseType.CANCEL'),
                gtk.STOCK_SAVE, branch_version(
                    'gtk.RESPONSE_OK',
                    'gtk.ResponseType.OK'),
            )
        )
        if filename:
            self.session_filename = filename
            stem, ext = os.path.splitext(self.session_filename)
            if not ext:
                self.session_filename += '.session'
            self.save_session(self.session_filename)
            msg = 'Session file: %s' % (self.session_filename, )
            self.statusbar.pop(self.statusbar_cid)
            self.statusbar.push(self.statusbar_cid, msg)

    def save_session(self, filename):
        self.trans_gui_2_obj()
        sessionObj = self.params
        outfile = open(filename, 'w')
        outfile.write('<?xml version="1.0" ?>\n')
        sessionObj.export(
            outfile, 0, name_="session",
            namespacedef_='')
        outfile.close()
        msg = 'Session saved to file:\n%s' % (filename, )
        msgTy = branch_version('gtk.MESSAGE_INFO', 'gtk.MessageType.INFO')
        self.error_message(msg, msgTy)
        self.saved_params = self.params.copy()

    def load_session(self, filename):
        try:
            doc = generateds_gui_session.parsexml_(filename)
            rootNode = doc.getroot()
            rootTag, rootClass = generateds_gui_session.get_root_tag(rootNode)
            if rootClass is None:
                #rootTag = 'session'
                rootClass = generateds_gui_session.sessionType
            sessionObj = rootClass.factory()
            sessionObj.build(rootNode)
            self.params = sessionObj
            self.trans_obj_2_gui()
            self.trans_gui_2_obj()
            self.saved_params = self.params.copy()
        except IOError as exp:
            msg = str(exp)
            self.error_message(msg)
        except expat.ExpatError as exp:
            msg = '%s file: %s' % (str(exp), filename, )
            self.error_message(msg)

    def on_about_menu_item_activate(self, menuitem, data=None):
        if self.about_dialog:
            self.about_dialog.present()
            return
        authors = [
            'Dave Kuhlman <dkuhlman@rexx.com>',
        ]
        about_dialog = gtk.AboutDialog()
        about_dialog.set_transient_for(self.window)
        about_dialog.set_destroy_with_parent(True)
        about_dialog.set_name("generateDS.py Python bindings generator")
        about_dialog.set_version(VERSION)
        about_dialog.set_copyright("Copyright \xc2\xa9 2009 Dave Kuhlman")
        about_dialog.set_website("http://www.rexx.com/~dkuhlman")
        about_dialog.set_comments("GTK+ and Glade3 GUI front end")
        about_dialog.set_authors(authors)
        about_dialog.set_logo_icon_name(gtk.STOCK_EDIT)

        # callbacks for destroying the dialog
        def close(dialog, response, editor):
            editor.about_dialog = None
            dialog.destroy()

        def delete_event(dialog, event, editor):
            editor.about_dialog = None
            return True

        about_dialog.connect("response", close, self)
        about_dialog.connect("delete-event", delete_event, self)
        self.about_dialog = about_dialog
        about_dialog.show()

    def error_message(self, message, message_type=None):
        # log to terminal window
        #print message
        # create an error message dialog and display modally to the user
        if message_type is None:
            message_type = branch_version(
                'gtk.MESSAGE_ERROR',
                'gtk.MessageType.ERROR')
        dialog = gtk.MessageDialog(
            None,
            branch_version(
                'gtk.DIALOG_MODAL',
                'gtk.DialogFlags.MODAL') |
            branch_version(
                'gtk.DIALOG_DESTROY_WITH_PARENT',
                'gtk.DialogFlags.DESTROY_WITH_PARENT'),
            message_type, branch_version(
                'gtk.BUTTONS_OK',
                'gtk.ButtonsType.OK'),
            message)
        dialog.run()
        dialog.destroy()

    def reset_default_status(self):
        msg = "Session file: (UNTITLED)"
        self.statusbar.pop(self.statusbar_cid)
        self.statusbar.push(self.statusbar_cid, msg)

    def on_input_schema_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_OPEN',
                'gtk.FileChooserAction.OPEN'),
            (('Schemas *.xsd', '*.xsd'),))
        if filename:
            self.input_schema_entry.set_text(filename)

    def on_output_superclass_chooser_button_clicked(self, widget, data=None):
        filename = self.choose_filename(patterns=(('Python *.py', '*.py'), ))
        if filename:
            self.output_superclass_entry.set_text(filename)
            #self.on_output_superclass_entry_changed(
            #    self.output_superclass_entry, data)

    def on_output_subclass_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(patterns=(('Python *.py', '*.py'), ))
        if filename:
            self.output_subclass_entry.set_text(filename)

    def on_behavior_filename_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_OPEN',
                'gtk.FileChooserAction.OPEN'),
            (('Python *.py', '*.py'),))
        if filename:
            self.behavior_filename_entry.set_text(filename)

    def on_validator_bodies_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_SELECT_FOLDER',
                'gtk.FileChooserAction.SELECT_FOLDER'),
        )
        if filename:
            self.validator_bodies_entry.set_text(filename)

    def on_user_methods_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_OPEN',
                'gtk.FileChooserAction.OPEN'),
            (('Python *.py', '*.py'),))
        if filename:
            self.user_methods_entry.set_text(filename)

    def on_output_directory_chooser_button_clicked(self, button, data=None):
        filename = self.choose_filename(
            branch_version(
                'gtk.FILE_CHOOSER_ACTION_SELECT_FOLDER',
                'gtk.FileChooserAction.SELECT_FOLDER'),
        )
        if filename:
            self.output_directory_entry.set_text(filename)

    def choose_filename(
            self,
            action=None,
            patterns=(),
            confirm_overwrite=False,
            initfilename=None,
            buttons=None):
        if action is None:
            action = branch_version(
                'gtk.FILE_CHOOSER_ACTION_SAVE', 'gtk.FileChooserAction.SAVE')
        filename = None
        ty_CANCEL = branch_version(
            'gtk.RESPONSE_CANCEL',
            'gtk.ResponseType.CANCEL')
        ty_OK = branch_version('gtk.RESPONSE_OK', 'gtk.ResponseType.OK')
        if buttons is None:
            buttons = (
                gtk.STOCK_CANCEL, ty_CANCEL,
                gtk.STOCK_OPEN, ty_OK,
            )
        dialog = gtk.FileChooserDialog(
            title=None,
            action=action,
            buttons=buttons,
        )
        if self.current_folder is not None:
            dialog.set_current_folder(self.current_folder)
        if initfilename is not None:
            dialog.set_filename(initfilename)
        if patterns:
            filter = gtk.FileFilter()
            for name, pattern in patterns:
                filter.set_name(name)
                filter.add_pattern(pattern)
            dialog.add_filter(filter)
            filter = gtk.FileFilter()
            filter.set_name("All files *.*")
            filter.add_pattern("*")
            dialog.add_filter(filter)
        dialog.set_do_overwrite_confirmation(confirm_overwrite)
        response = dialog.run()
        if response == branch_version(
                'gtk.RESPONSE_OK', 'gtk.ResponseType.OK'):
            filename = dialog.get_filename()
            self.current_folder = dialog.get_current_folder()
        elif response == branch_version(
                'gtk.RESPONSE_CANCEL', 'gtk.ResponseType.CANCEL'):
            pass
        dialog.destroy()
        return filename

    def on_namespace_prefix_entry_changed(self, widget, data=None):
        #entry = self.ui_obj_dict['namespace_prefix_entry']
        checkbutton = self.ui_obj_dict['empty_namespace_prefix_checkbutton']
        checkbutton.set_active(False)
        return True

    def on_empty_namespace_prefix_checkbutton_toggled(self, widget, data=None):
        entry = self.ui_obj_dict['namespace_prefix_entry']
        #checkbutton = self.ui_obj_dict['empty_namespace_prefix_checkbutton']
        if widget.get_active():
            entry.set_text('')
        return True

    def on_output_superclass_entry_changed(self, widget, data=None):
        entry = self.ui_obj_dict['superclass_module_entry']
        checkbutton = self.auto_super_checkbutton
        if checkbutton.get_active():
            path = widget.get_text()
            if path:
                stem = os.path.splitext(os.path.split(path)[1])[0]
                if stem:
                    entry.set_text(stem)
        return True

    def on_auto_super_checkbutton_toggled(self, widget, data=None):
        entry = self.ui_obj_dict['superclass_module_entry']
        superclass_entry = self.ui_obj_dict['output_superclass_entry']
        #checkbutton = self.auto_super_checkbutton
        #checkbutton = widget
        if widget.get_active():
            path = superclass_entry.get_text()
            if path:
                stem = os.path.splitext(os.path.split(path)[1])[0]
                if stem:
                    entry.set_text(stem)
        return True

    def on_ok_button_activate(self, widget, data=None):
        #print( '(GeneratedsGui) widget:', widget)
        response = self.content_dialog.on_ok_button_activate(
            self.content_dialog, data)
        return response

    name_pat1 = re.compile(r'^(.*)_clear_button')

    # This method keys off the correspondence between the
    #   name of the button and the name of the related entry,
    #   for example, xxx_yyy_entry : xxx_yyy_clear_button.
    def on_clear_button_clicked(self, widget, data=None):
        # http://python.6.x6.nabble.com/Confused-about-a-widget-s-name-td5015372.html
        name = (
            widget.get_name()
            if sys.version_info.major == 2
            else gtk.Buildable.get_name(widget))
        mo = GeneratedsGui.name_pat1.search(name)
        if mo is not None:
            stem = mo.group(1)
            name1 = '%s_entry' % (stem, )
            ui_obj = self.ui_obj_dict[name1]
            ui_obj.set_text('')

    # Run main application window
    def main(self):
        self.window.show()
        gtk.main()


class ContentDialog(gtk.Dialog):
    def __init__(self):
        global Builder
        self.content_dialog = Builder.get_object('content_dialog')
        self.content_textview = Builder.get_object('content_textview')
        self.content_textview.get_buffer().set_text('')

    def show(self, content):
        #Builder.connect_signals(self)
        if isinstance(content, bytes):
            content = content.decode('utf-8')
        self.content_textview.get_buffer().set_text(content)
        self.content_dialog.run()
        self.content_dialog.hide()

    def on_ok_button_activate(self, widget, data=None):
        #print( '(content_dialog) widget:', widget)
        return False


#
# Functions for internal use
#

def branch_version(for_2, for_3):
    """
    The Branch works depends on the version of Python
    """
    if sys.version_info.major == 2:
        return eval(for_2)
    elif sys.version_info.major == 3:
        return eval(for_3)
    else:
        return eval(for_3)


def capture_options(options):
    config_parser = ConfigParser()
    config_parser.read([
        os.path.expanduser('~/.generateds_gui.ini'),
        './generateds_gui.ini',
    ])
    section = 'general'
    names = ('exec-path', 'exec_path')
    capture_1_option(options, config_parser, section, names)
##     names = ('impl-schema', 'impl_schema')
##     capture_1_option(options, config_parser, section, names)
    names = ('impl-gui', 'impl_gui')
    capture_1_option(options, config_parser, section, names)
    names = ('session', 'session')
    capture_1_option(options, config_parser, section, names)
    # Set some defaults.
    if options.exec_path is None:
        options.exec_path = 'generateDS.py'


def capture_1_option(options, config_parser, section, names):
    if (
            getattr(options, names[1]) is None and
            config_parser.has_option(section, names[0])):
        setattr(options, names[1], config_parser.get(section, names[0]))


def capture_ui_names():
    items = generateds_gui_session.sessionType.member_data_items_
    for item in items:
        ui_item = UIItemSpec(item.get_name())
        if item.get_name() == 'member_specs':
            ui_item.set_ui_type('combobox')
            ui_item.set_access_action('active')
        elif item.get_data_type() == 'xs:string':
            ui_item.set_ui_type('entry')
            ui_item.set_access_action('text')
        elif item.get_data_type() == 'xs:boolean':
            ui_item.set_ui_type('checkbutton')
            ui_item.set_access_action('active')
        ParamNameList.append(ui_item)
##     print 'ParamNameList:'
##     for item in ParamNameList:
##         print '    %s  %s' % (item.get_name(), item.get_ui_type(), )


USAGE_TEXT = """
    python %prog [options] --session=<some_session_file.session>
example:
    python %prog --session=generator01.session"""


def usage(parser):
    parser.print_help()
    sys.exit(1)


def main():
    parser = OptionParser(USAGE_TEXT)
    parser.add_option(
        "--exec-path",
        type="string", action="store",
        dest="exec_path",
        #default="generateDS.py",
        help=(
            'path to executable generated in command line.'
            '  Example: "python /path/to/generateDS.py".'
            '  Default: "./generateDS.py".'
            '  Use Tools/Generate CL (Ctrl-T) to see it.')
    )
    parser.add_option(
        "--impl-gui",
        type="string", action="store",
        dest="impl_gui",
        help="name of glade file that defines the GUI if not embedded."
    )
    parser.add_option(
        "-s", "--session",
        type="string", action="store",
        dest="session",
        help="name of a session file to be loaded."
    )
    (options, args) = parser.parse_args()
    capture_options(options)
    capture_ui_names()
    if len(args) > 0:
        usage(parser)
    # Set up for internationalization.
    app_name = 'generateds_gui'
    dir_name = 'locale'
    locale.setlocale(locale.LC_ALL, '')
    gettext.bindtextdomain(app_name, dir_name)
    gettext.textdomain(app_name)
    # Start the app.
    editor = GeneratedsGui(options)
    editor.main()

# Do not change the next 3 lines.
## UI_SPECIFICATION ##

Ui_spec = """
<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated with glade 3.18.3 -->
<interface>
  <requires lib="gtk+" version="3.0"/>
  <object class="GtkAccelGroup" id="accelgroup1"/>
  <object class="GtkDialog" id="content_dialog">
    <property name="can_focus">False</property>
    <property name="border_width">5</property>
    <property name="title" translatable="yes">Messages and Content</property>
    <property name="default_width">800</property>
    <property name="default_height">600</property>
    <property name="type_hint">normal</property>
    <child internal-child="vbox">
      <object class="GtkBox" id="dialog-vbox3">
        <property name="visible">True</property>
        <property name="can_focus">False</property>
        <property name="spacing">2</property>
        <child internal-child="action_area">
          <object class="GtkButtonBox" id="dialog-action_area3">
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="layout_style">end</property>
            <child>
              <object class="GtkButton" id="content_dialog_ok_button">
                <property name="label" translatable="yes">OK</property>
                <property name="visible">True</property>
                <property name="can_focus">True</property>
                <property name="receives_default">True</property>
                <signal name="activate" handler="on_ok_button_activate" swapped="no"/>
              </object>
              <packing>
                <property name="expand">False</property>
                <property name="fill">False</property>
                <property name="position">0</property>
              </packing>
            </child>
          </object>
          <packing>
            <property name="expand">False</property>
            <property name="fill">False</property>
            <property name="pack_type">end</property>
            <property name="position">0</property>
          </packing>
        </child>
        <child>
          <object class="GtkScrolledWindow" id="scrolledwindow1">
            <property name="visible">True</property>
            <property name="can_focus">True</property>
            <property name="min_content_width">250</property>
            <property name="min_content_height">500</property>
            <child>
              <object class="GtkTextView" id="content_textview">
                <property name="visible">True</property>
                <property name="can_focus">True</property>
                <property name="editable">False</property>
              </object>
            </child>
          </object>
          <packing>
            <property name="expand">False</property>
            <property name="fill">True</property>
            <property name="position">1</property>
          </packing>
        </child>
      </object>
    </child>
    <action-widgets>
      <action-widget response="0">content_dialog_ok_button</action-widget>
    </action-widgets>
  </object>
  <object class="GtkImage" id="image1">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="stock">gtk-save</property>
  </object>
  <object class="GtkImage" id="image2">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="stock">gtk-save-as</property>
  </object>
  <object class="GtkImage" id="image3">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="stock">gtk-open</property>
  </object>
  <object class="GtkImage" id="image4">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="stock">gtk-clear</property>
  </object>
  <object class="GtkWindow" id="window1">
    <property name="can_focus">False</property>
    <accel-groups>
      <group name="accelgroup1"/>
    </accel-groups>
    <signal name="delete-event" handler="on_window_delete_event" swapped="no"/>
    <child>
      <object class="GtkVBox" id="vbox1">
        <property name="visible">True</property>
        <property name="can_focus">False</property>
        <child>
          <object class="GtkMenuBar" id="menubar1">
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <child>
              <object class="GtkMenuItem" id="menuitem1">
                <property name="visible">True</property>
                <property name="can_focus">False</property>
                <property name="label" translatable="yes">_File</property>
                <property name="use_underline">True</property>
                <child type="submenu">
                  <object class="GtkMenu" id="menu1">
                    <property name="visible">True</property>
                    <property name="can_focus">False</property>
                    <child>
                      <object class="GtkImageMenuItem" id="clear_menuitem">
                        <property name="label">Clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="image">image4</property>
                        <property name="use_stock">False</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_clear_menuitem_activate" swapped="no"/>
                        <accelerator key="n" signal="activate" modifiers="GDK_CONTROL_MASK"/>
                      </object>
                    </child>
                    <child>
                      <object class="GtkImageMenuItem" id="open_session_menuitem">
                        <property name="label">_Load session</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Load a previous saved session.</property>
                        <property name="use_underline">True</property>
                        <property name="image">image3</property>
                        <property name="use_stock">False</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_open_session_menuitem_activate" swapped="no"/>
                        <accelerator key="o" signal="activate" modifiers="GDK_CONTROL_MASK"/>
                      </object>
                    </child>
                    <child>
                      <object class="GtkImageMenuItem" id="save_session_menuitem">
                        <property name="label">_Save session</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Save the current session.</property>
                        <property name="use_underline">True</property>
                        <property name="image">image1</property>
                        <property name="use_stock">False</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_save_session_menuitem_activate" swapped="no"/>
                        <accelerator key="s" signal="activate" modifiers="GDK_CONTROL_MASK"/>
                      </object>
                    </child>
                    <child>
                      <object class="GtkImageMenuItem" id="save_session_as_menuitem">
                        <property name="label">Save session as ...</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Save the current session in
file chosen by the user.</property>
                        <property name="image">image2</property>
                        <property name="use_stock">False</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_save_session_as_menuitem_activate" swapped="no"/>
                      </object>
                    </child>
                    <child>
                      <object class="GtkSeparatorMenuItem" id="menuitem5">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                      </object>
                    </child>
                    <child>
                      <object class="GtkImageMenuItem" id="imagemenuitem5">
                        <property name="label">gtk-quit</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Exit from the application.</property>
                        <property name="use_underline">True</property>
                        <property name="use_stock">True</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_quit_menu_item_activate" swapped="no"/>
                      </object>
                    </child>
                  </object>
                </child>
              </object>
            </child>
            <child>
              <object class="GtkMenuItem" id="menuitem2">
                <property name="visible">True</property>
                <property name="can_focus">False</property>
                <property name="label" translatable="yes">_Tools</property>
                <property name="use_underline">True</property>
                <child type="submenu">
                  <object class="GtkMenu" id="menu2">
                    <property name="visible">True</property>
                    <property name="can_focus">False</property>
                    <child>
                      <object class="GtkMenuItem" id="capture_cl_menuitem">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Capture the command line that would be used
to generate the bindings modules.</property>
                        <property name="label" translatable="yes">_Capture CL</property>
                        <property name="use_underline">True</property>
                        <signal name="activate" handler="on_capture_cl_menuitem_activate" swapped="no"/>
                        <accelerator key="t" signal="activate" modifiers="GDK_CONTROL_MASK"/>
                      </object>
                    </child>
                    <child>
                      <object class="GtkMenuItem" id="generate_menuitem">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="tooltip_text" translatable="yes">Generate the bindings modules.</property>
                        <property name="label" translatable="yes">_Generate</property>
                        <property name="use_underline">True</property>
                        <signal name="activate" handler="on_generate_menuitem_activate" swapped="no"/>
                        <accelerator key="g" signal="activate" modifiers="GDK_CONTROL_MASK"/>
                      </object>
                    </child>
                  </object>
                </child>
              </object>
            </child>
            <child>
              <object class="GtkMenuItem" id="menuitem4">
                <property name="visible">True</property>
                <property name="can_focus">False</property>
                <property name="label" translatable="yes">_Help</property>
                <property name="use_underline">True</property>
                <child type="submenu">
                  <object class="GtkMenu" id="menu3">
                    <property name="visible">True</property>
                    <property name="can_focus">False</property>
                    <child>
                      <object class="GtkImageMenuItem" id="imagemenuitem10">
                        <property name="label">gtk-about</property>
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="use_underline">True</property>
                        <property name="use_stock">True</property>
                        <property name="accel_group">accelgroup1</property>
                        <signal name="activate" handler="on_about_menu_item_activate" swapped="no"/>
                      </object>
                    </child>
                  </object>
                </child>
              </object>
            </child>
          </object>
          <packing>
            <property name="expand">False</property>
            <property name="fill">True</property>
            <property name="position">0</property>
          </packing>
        </child>
        <child>
          <object class="GtkScrolledWindow" id="scrolledwindow2">
            <property name="visible">True</property>
            <property name="can_focus">True</property>
            <property name="shadow_type">in</property>
            <property name="min_content_width">1000</property>
            <property name="min_content_height">600</property>
            <child>
              <object class="GtkViewport" id="viewport1">
                <property name="visible">True</property>
                <property name="can_focus">False</property>
                <child>
                  <object class="GtkTable" id="table1">
                    <property name="visible">True</property>
                    <property name="can_focus">False</property>
                    <property name="n_rows">29</property>
                    <property name="n_columns">4</property>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label1">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Input schema file:</property>
                        <property name="xalign">0</property>
                      </object>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label2">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Output superclass file:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">1</property>
                        <property name="bottom_attach">2</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label3">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Output subclass file:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">2</property>
                        <property name="bottom_attach">3</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label4">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Overwrite without asking:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">3</property>
                        <property name="bottom_attach">4</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="force_checkbutton">
                        <property name="label" translatable="yes">Force</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Always overwrite output files.
Do not ask for confirmation.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">3</property>
                        <property name="bottom_attach">4</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="input_schema_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">The path and name of the
input XML schema defining the
bindings to be generated.</property>
                        <property name="invisible_char">●</property>
                        <property name="width_chars">80</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="output_superclass_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">The path and name of the output file
to be generated and to contain the 
superclasses.</property>
                        <property name="invisible_char">●</property>
                        <signal name="changed" handler="on_output_superclass_entry_changed" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">1</property>
                        <property name="bottom_attach">2</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="output_subclass_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">The path and name of the output file
to be generated and to contain the 
subclasses.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">2</property>
                        <property name="bottom_attach">3</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label5">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Prefix (for class names):</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">4</property>
                        <property name="bottom_attach">5</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="prefix_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Prefix for class names.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">4</property>
                        <property name="bottom_attach">5</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label6">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Namespace prefix:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">5</property>
                        <property name="bottom_attach">6</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="namespace_prefix_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="events">GDK_KEY_RELEASE_MASK | GDK_STRUCTURE_MASK</property>
                        <property name="tooltip_text" translatable="yes">Override default namespace
prefix in schema file.
Example: -a "xsd:"
Default: "xs:".</property>
                        <property name="invisible_char">●</property>
                        <signal name="changed" handler="on_namespace_prefix_entry_changed" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">5</property>
                        <property name="bottom_attach">6</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label7">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Behavior file name:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">6</property>
                        <property name="bottom_attach">7</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="behavior_filename_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Input file name for behaviors
added to subclasses.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">6</property>
                        <property name="bottom_attach">7</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label8">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Generate Python properties:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">7</property>
                        <property name="bottom_attach">8</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="properties_checkbutton">
                        <property name="label" translatable="yes">Properties</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Generate Python properties for member variables
so that the value can be retrieved and modified
without calling getter and setter functions.
</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">7</property>
                        <property name="bottom_attach">8</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label10">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Subclass suffix:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">9</property>
                        <property name="bottom_attach">10</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="subclass_suffix_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Append this text to the generated subclass names.
Default="Sub".</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">9</property>
                        <property name="bottom_attach">10</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label11">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Root element:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">10</property>
                        <property name="bottom_attach">11</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="root_element_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Assume that this value is the name
of the root element of instance docs.
Default is first element defined in schema.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">10</property>
                        <property name="bottom_attach">11</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="input_schema_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the input schema file.</property>
                        <signal name="clicked" handler="on_input_schema_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_superclass_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the output superclass bindings file.</property>
                        <signal name="clicked" handler="on_output_superclass_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">1</property>
                        <property name="bottom_attach">2</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_subclass_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the output subclass bindings file.</property>
                        <signal name="clicked" handler="on_output_subclass_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">2</property>
                        <property name="bottom_attach">3</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="behavior_filename_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the nput file name for
behaviors added to subclasses.</property>
                        <signal name="clicked" handler="on_behavior_filename_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">6</property>
                        <property name="bottom_attach">7</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label12">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Superclass module:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">11</property>
                        <property name="bottom_attach">12</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="superclass_module_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Superclass module name in subclass module.
Default="???".</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">11</property>
                        <property name="bottom_attach">12</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label13">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Use old getters and setters:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">12</property>
                        <property name="bottom_attach">13</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="old_getters_setters_checkbutton">
                        <property name="label" translatable="yes">Old getters and setters</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Name getters and setters getVar() and setVar(),
instead of get_var() and set_var().</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">12</property>
                        <property name="bottom_attach">13</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label14">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Validator bodies path:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">13</property>
                        <property name="bottom_attach">14</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label15">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">User methods module:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">14</property>
                        <property name="bottom_attach">15</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label16">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">No dates:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">15</property>
                        <property name="bottom_attach">16</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label17">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">No versions:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">16</property>
                        <property name="bottom_attach">17</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="no_dates_checkbutton">
                        <property name="label" translatable="yes">No dates in generated output</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Do not include the current date in the generated
files. This is useful if you want to minimize
the amount of (no-operation) changes to the
generated python code.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">15</property>
                        <property name="bottom_attach">16</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="validator_bodies_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Path to a directory containing files that provide
bodies (implementations) of validator methods.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">13</property>
                        <property name="bottom_attach">14</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="validator_bodies_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the path to a directory containing files that provide
bodies (implementations) of validator methods.</property>
                        <signal name="clicked" handler="on_validator_bodies_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">13</property>
                        <property name="bottom_attach">14</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="no_versions_checkbutton">
                        <property name="label" translatable="yes">No version info in generated output</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Do not include the current version in the generated
files. This is useful if you want to minimize
the amount of (no-operation) changes to the
generated python code.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">16</property>
                        <property name="bottom_attach">17</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="user_methods_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the optional module containing user methods.  See
section "User Methods" in the documentation.</property>
                        <signal name="clicked" handler="on_user_methods_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">14</property>
                        <property name="bottom_attach">15</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="user_methods_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Optional module containing user methods.  See
section "User Methods" in the documentation.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">14</property>
                        <property name="bottom_attach">15</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label18">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">No process includes:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">17</property>
                        <property name="bottom_attach">18</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label19">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Silence:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">18</property>
                        <property name="bottom_attach">19</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="no_process_includes_checkbutton">
                        <property name="label" translatable="yes">Do not process includes in schema</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Do not process included XML Schema files.  By
default, generateDS.py will insert content
from files referenced by &lt;include ... /&gt;
elements into the XML Schema to be processed.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">17</property>
                        <property name="bottom_attach">18</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="silence_checkbutton">
                        <property name="label" translatable="yes">Generate code that does not echo the parsed XML</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Normally, the code generated with generateDS
echoes the information being parsed. Use
this option to turn off that behavior.
</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">18</property>
                        <property name="bottom_attach">19</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label20">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Namespace definitions:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">19</property>
                        <property name="bottom_attach">20</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label21">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">External encoding:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">20</property>
                        <property name="bottom_attach">21</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label22">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Member specs:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">22</property>
                        <property name="bottom_attach">23</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="namespace_defs_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Namespace definition to be passed in as the
value for the namespacedef_ parameter of
the export() method by the generated
parse() and parseString() functions.
Default=''.  Example:
xmlns:abc="http://www.abc.com"</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">19</property>
                        <property name="bottom_attach">20</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="external_encoding_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Encode output written by the generated export
methods using this encoding.  Default, if omitted,
is the value returned by sys.getdefaultencoding().
Example: utf-8.</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">20</property>
                        <property name="bottom_attach">21</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkHBox" id="member_specs_combobox_container">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <child>
                          <placeholder/>
                        </child>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">22</property>
                        <property name="bottom_attach">23</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="empty_namespace_prefix_checkbutton">
                        <property name="label" translatable="yes">Empty</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Assume an empty namespace
prefix in the XML schema, not
the default ("xs:").</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                        <signal name="toggled" handler="on_empty_namespace_prefix_checkbutton_toggled" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">5</property>
                        <property name="bottom_attach">6</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="auto_super_checkbutton">
                        <property name="label" translatable="yes">Auto</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Use the superclass file name
stem as the super-class module
name.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                        <signal name="toggled" handler="on_auto_super_checkbutton_toggled" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">11</property>
                        <property name="bottom_attach">12</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="input_schema_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the input schema file entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_superclass_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the output superclass file entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">1</property>
                        <property name="bottom_attach">2</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_subclass_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the output subclass file entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">2</property>
                        <property name="bottom_attach">3</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="prefix_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the prefix entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">4</property>
                        <property name="bottom_attach">5</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="namespace_prefix_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the XML namespace prefix entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">5</property>
                        <property name="bottom_attach">6</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="behavior_filename_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the behavior file name entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">6</property>
                        <property name="bottom_attach">7</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="subclass_suffix_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the subclass suffix.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">9</property>
                        <property name="bottom_attach">10</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="root_element_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the root element entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">10</property>
                        <property name="bottom_attach">11</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="superclass_module_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the superclass module entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">11</property>
                        <property name="bottom_attach">12</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="validator_bodies_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the validator bodies path entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">13</property>
                        <property name="bottom_attach">14</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="user_methods_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the user methods module entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">14</property>
                        <property name="bottom_attach">15</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="namespace_defs_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the namespace definitions entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">19</property>
                        <property name="bottom_attach">20</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="external_encoding_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the external encoding entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">20</property>
                        <property name="bottom_attach">21</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label23">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Get encoded:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">21</property>
                        <property name="bottom_attach">22</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="get_encoded_checkbutton">
                        <property name="label" translatable="yes">Getters return encoded values by default</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Getters return encoded value by default if true.
Can be changed at run-time by either
(1) changing global variable GetEncodedValue or
(2) using optional parameter to getter.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">21</property>
                        <property name="bottom_attach">22</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label24">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Exports:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">23</property>
                        <property name="bottom_attach">24</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="export_spec_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Specifies export functions to be generated.  Value is a whitespace separated list of any of the following: "write" (write XML to file), "literal" (write out python code), "etree" (build element tree (can serialize to XML)).            Example: "write etree".  Default: "write".</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">23</property>
                        <property name="bottom_attach">24</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label25">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">One file per XSD:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">24</property>
                        <property name="bottom_attach">25</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="one_file_per_xsd_checkbutton">
                        <property name="label" translatable="yes">Create a python module for each XSD processed.</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Create a python module for each XSD processed.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">24</property>
                        <property name="bottom_attach">25</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label26">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Output directory:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">25</property>
                        <property name="bottom_attach">26</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="output_directory_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Used in conjunction with --one-file-per-xsd.  The directory where the modules will be created.</property>
                        <property name="invisible_char">●</property>
                        <property name="width_chars">80</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">25</property>
                        <property name="bottom_attach">26</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_directory_chooser_button">
                        <property name="label" translatable="yes">Choose</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Choose the output directory for one-file-per-xsd.</property>
                        <signal name="clicked" handler="on_output_directory_chooser_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">2</property>
                        <property name="right_attach">3</property>
                        <property name="top_attach">25</property>
                        <property name="bottom_attach">26</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="output_directory_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the output directory entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">25</property>
                        <property name="bottom_attach">26</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="export_spec_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the exports entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">23</property>
                        <property name="bottom_attach">24</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label27">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Module suffix:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">26</property>
                        <property name="bottom_attach">27</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label28">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Preserve CData tags:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">27</property>
                        <property name="bottom_attach">28</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkLabel" id="label29">
                        <property name="visible">True</property>
                        <property name="can_focus">False</property>
                        <property name="label" translatable="yes">Cleanup name list:</property>
                        <property name="xalign">0</property>
                      </object>
                      <packing>
                        <property name="top_attach">28</property>
                        <property name="bottom_attach">29</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="module_suffix_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">To be used in conjunction with --one-file-per-xsd.  Append XXX to the end of each file created.</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">26</property>
                        <property name="bottom_attach">27</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkEntry" id="cleanup_name_list_entry">
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="tooltip_text" translatable="yes">Specifies list of 2-tuples used for cleaning names.  First element is a regular expression search pattern and second is a replacement. Example: "[('[-:.]', '_'), ('^__', 'Special')]".  Default: "[('[-:.]', '_')]".</property>
                        <property name="invisible_char">●</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">28</property>
                        <property name="bottom_attach">29</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkCheckButton" id="preserve_cdata_tags_checkbutton">
                        <property name="label" translatable="yes">Preserve CData tags</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">False</property>
                        <property name="tooltip_text" translatable="yes">Preserve CDATA tags.  Default: False.</property>
                        <property name="xalign">0</property>
                        <property name="draw_indicator">True</property>
                      </object>
                      <packing>
                        <property name="left_attach">1</property>
                        <property name="right_attach">2</property>
                        <property name="top_attach">27</property>
                        <property name="bottom_attach">28</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="module_suffix_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the module suffix entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">26</property>
                        <property name="bottom_attach">27</property>
                      </packing>
                    </child>
                    <child>
                      <object class="GtkButton" id="cleanup_name_list_clear_button">
                        <property name="label">gtk-clear</property>
                        <property name="visible">True</property>
                        <property name="can_focus">True</property>
                        <property name="receives_default">True</property>
                        <property name="tooltip_text" translatable="yes">Clear the cleanup name list entry.</property>
                        <property name="use_stock">True</property>
                        <signal name="clicked" handler="on_clear_button_clicked" swapped="no"/>
                      </object>
                      <packing>
                        <property name="left_attach">3</property>
                        <property name="right_attach">4</property>
                        <property name="top_attach">28</property>
                        <property name="bottom_attach">29</property>
                      </packing>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                    <child>
                      <placeholder/>
                    </child>
                  </object>
                </child>
              </object>
            </child>
          </object>
          <packing>
            <property name="expand">True</property>
            <property name="fill">True</property>
            <property name="position">1</property>
          </packing>
        </child>
        <child>
          <object class="GtkHBox" id="hbox1">
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="homogeneous">True</property>
            <child>
              <object class="GtkButton" id="generate_button">
                <property name="label" translatable="yes">Generate</property>
                <property name="visible">True</property>
                <property name="can_focus">True</property>
                <property name="receives_default">True</property>
                <property name="tooltip_text" translatable="yes">Generate the bindings modules.</property>
                <signal name="clicked" handler="on_generate_button_clicked" swapped="no"/>
              </object>
              <packing>
                <property name="expand">True</property>
                <property name="fill">True</property>
                <property name="position">0</property>
              </packing>
            </child>
            <child>
              <object class="GtkButton" id="quit_button">
                <property name="label" translatable="yes">Quit</property>
                <property name="visible">True</property>
                <property name="can_focus">True</property>
                <property name="receives_default">True</property>
                <property name="tooltip_text" translatable="yes">Exit from the application.</property>
                <signal name="clicked" handler="on_quit_button_clicked" swapped="no"/>
              </object>
              <packing>
                <property name="expand">True</property>
                <property name="fill">True</property>
                <property name="position">1</property>
              </packing>
            </child>
          </object>
          <packing>
            <property name="expand">False</property>
            <property name="fill">False</property>
            <property name="position">2</property>
          </packing>
        </child>
        <child>
          <object class="GtkStatusbar" id="statusbar1">
            <property name="visible">True</property>
            <property name="can_focus">False</property>
            <property name="spacing">2</property>
          </object>
          <packing>
            <property name="expand">False</property>
            <property name="fill">True</property>
            <property name="position">3</property>
          </packing>
        </child>
        <child>
          <placeholder/>
        </child>
      </object>
    </child>
  </object>
  <object class="GtkImage" id="image5">
    <property name="visible">True</property>
    <property name="can_focus">False</property>
    <property name="stock">gtk-missing-image</property>
  </object>
</interface>
"""

## UI_SPECIFICATION ##
# Do not change the above 3 lines.


if __name__ == "__main__":
    main()
