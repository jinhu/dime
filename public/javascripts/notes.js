var noteStorageDb = null;

function Note(user_id, noteElementId, noteToolbar) {
	if(!initDb()){
		console.log("initDB FAILED");
		return null;
	}
	
	var self = this;
	var note = document.getElementById(noteElementId);
	this.note = note;
	
	var toolbar = document.getElementById(noteToolbar);
	this.toolbar = toolbar;
	
	var timestamp = new Date().getTime();
	this.timestamp = timestamp;
	
	var userid = user_id;
	this.userid = userid;
	
	// Make sure there is a row to work with in the database
	noteStorageDb.transaction(function(tx) {
		tx.executeSql("SELECT userid, content, timestamp FROM NoteStorage WHERE userid = ? ", [self.userid], function(tx, result) {
			if(result.rows.length == 0) {
				noteStorageDb.transaction(function (tx) {
					tx.executeSql("INSERT INTO NoteStorage (userid, content, timestamp) VALUES (?, ?, ?)", [self.userid, '', self.timestamp]);
				});
				console.log('No row found, new row created');
				self.text = '';
			} else {
				console.log('Row found, inserting data');
				self.timestamp = result.rows.item(0)['timestamp'];
				self.text = result.rows.item(0)['content'];
			}
		}, function(tx, error) {
			console.log('Error found: ' + error.message);
			return null;
		});
	});
	
	note.addEventListener('keyup', function() { return self.onKeyUp() }, false);

	return this;
}

// Initializes database or creates it when it is absent
function initDb(){
	try {
		if (window.openDatabase) {
			noteStorageDb = openDatabase("NoteStorage", "1.0", "MMS-Notes", 512*1024);
			if (noteStorageDb){
				console.log("Db 'NoteStorage' opened.");
				noteStorageDb.transaction(function(tx) {
					tx.executeSql("SELECT COUNT(content) FROM NoteStorage", [], function(result) {}, function(tx, error) {
						console.log("No valid row found, creating new.");
						tx.executeSql("CREATE TABLE NoteStorage (userid REAL UNIQUE, content TEXT, timestamp REAL)", [], function(result) {});
					});
				});
				return true;
			}
		}
	} catch(err) {
		noteStorageDb = null;
	}
	return false;
}

Note.prototype = {
	get text() {
		return this.note.value;
	},
	
	set text(t) {
		console.log("set text");
		this.note.value = t;
	},
	
	onKeyUp: function() {
		console.log("onKeyUp");
		this.storeSoon();
	},
	
	storeSoon: function() {
		this.cancelPendingStore();
		var self = this;
		this._storeTimer = setTimeout(function() { self.store() }, 500);
	},
	
	cancelPendingStore: function() {
		if (!("_storeTimer" in this))
			return;
		clearTimeout(this._storeTimer);
		delete this._storeTimer;
	},

	store: function() {
		var self = this;
		this.cancelPendingStore();
		noteStorageDb.transaction(function (tx){
			tx.executeSql("UPDATE NoteStorage SET content = ?, timestamp = ? WHERE userid = ?",
			              [self.text, self.timestamp, self.userid]);
		});
		this.toolbar.innerHTML = this.toolbar.innerHTML.replace('*', '');
		this.toolbar.innerHTML = this.toolbar.innerHTML + "*";
	},
	save: function() {
		var self = this
		
		$.ajax({
			type: "POST",
			url: '/patients/conditions/101', // test URL for success response
			data: {text : self.text, userid : self.userid, timestamp : self.timestamp},
			dataType: "html",
			error: function(XMLHttpRequest, textStatus) { alert("Failed"); } ,
			success: function(result) {
						alert("Success");
						self.remove();
					}
		});
	},
	remove: function()
	{
		var self = this;
		this.cancelPendingStore();
 
		noteStorageDb.transaction(function(tx) {
			tx.executeSql("DELETE FROM NoteStorage WHERE userid = ?", [self.userid], function(result, error){alert(result)});
		});
		
		self.note.innerHTML = "";
		self.toolbar.innerHTML = self.toolbar.innerHTML.replace('*', '');
	}
}