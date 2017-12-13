const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

const Gettext = imports.gettext.domain('gnome-shell-extensions');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

function init() {
}

const LifeclockPrefsWidget = new GObject.Class({
  Name: 'Lifeclock.Prefs.Widget',
  GTypeName: 'LifeclocksPrefsWidget',
  Extends: Gtk.Grid,

  _init: function(params) {
    this.parent(params);
    this.margin = 12;
    this.row_spacing = this.column_spacing = 6;
    this.set_orientation(Gtk.Orientation.VERTICAL);

    this.add(new Gtk.Label({ label: '<b>' + _("End Date") + '</b>',
      use_markup: true,
      halign: Gtk.Align.START }));

    let entry = new Gtk.Entry({ hexpand: true,
      margin_bottom: 12 });
    this.add(entry);

    this._settings = Convenience.getSettings();
    this._settings.bind('end-date', entry, 'text', Gio.SettingsBindFlags.DEFAULT);

    let primaryText = _("Enter a rough date for your life expectancy in the form yyyy-mm-dd\n");

    this.add(new Gtk.Label({ label: primaryText,
      wrap: true, xalign: 0 }));
  }
});

function buildPrefsWidget() {
  let widget = new LifeclockPrefsWidget();
  widget.show_all();

  return widget;
}

