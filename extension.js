const St = imports.gi.St;
const Main = imports.ui.main;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

const CountdownTimer = new Lang.Class({
		Name: 'CountdownTimer',
		Extends: PanelMenu.Button,
    _timeLeft: 1000,

		_init: function () {
			this.parent(0.0, "Life Seconds Countdown", false);

      // Get schema object:
      this._schema = Convenience.getSettings();

			this.buttonText = new St.Label({
				text: _("Loading..."),
				y_align: Clutter.ActorAlign.CENTER
			});

			this.actor.add_actor(this.buttonText);
			this._refresh();
		},

		_refresh: function () {
      this._setTimeLeft();
			this._refreshUI();
			this._removeTimeout();
			this._timeout = Mainloop.timeout_add_seconds(1, Lang.bind(this, this._refresh));

			return true;
		},

		_refreshUI: function() {
			this.buttonText.set_text(this._timeLeft.toString());
		},

		_removeTimeout: function () {
			if (this._timeout) {
				Mainloop.source_remove(this._timeout);
				this._timeout = null;
			}
		},

		stop: function () {
			if (this._timeout)
				Mainloop.source_remove(this._timeout);

			this._timeout = undefined;

			this.menu.removeAll();
		},


    _setTimeLeft: function() {
      this._endDate = this._schema.get_string('end-date');
      this._endDateAsEpochSeconds = new Date(this._endDate.toString()) / 1000;

      this._now = Math.floor(new Date() / 1000);
      global.log(this._endDateAsEpochSeconds.toString());
      global.log(this._now.toString());
      this._timeLeft = this._endDateAsEpochSeconds - this._now;
    }
	}
);


let countdownMenu;

function init() {
}

function enable() {
	countdownMenu = new CountdownTimer;
	Main.panel.addToStatusArea('countdown', countdownMenu);
}

function disable() {
	countdownMenu.stop();
	countdownMenu.destroy();
}
