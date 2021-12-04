(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.stats_frame_innerSmall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#C1C1C1","#848484"],[0,0.494],-151,-128.3,117.4,-128.3).ss(5,1,1).p("EgWLgvGMAsXAAAQBQAAAABQMAAABbtQAABQhQAAMgsXAAAQhQAAAAhQMAAAhbtQAAhQBQAAg");
	this.shape.setTransform(-0.0087,0,0.48,0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_frame_innerSmall, new cjs.Rectangle(-74.5,-153.2,149,306.5), null);


(lib.holder_default = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);


(lib.button_entry = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#EAEAEA","#CCCCCC"],[0,0.824],-84.1,-120.8,84.2,120.9).s().p("A2QB9QgyAAAAgyIAAiVQAAgyAyAAMAshAAAQAyAAAAAyIAACVQAAAygyAAg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFFFFF","#E5E5E5"],[0,0.824],-84.1,-120.8,84.2,120.9).s().p("A2QB9QgyAAAAgyIAAiVQAAgyAyAAMAshAAAQAyAAAAAyIAACVQAAAygyAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147.5,-12.5,295,25);


(lib.stats_headerSmall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new cjs.Text("Label", "bold 20px 'Tahoma'", "#333333");
	this.label.name = "label";
	this.label.textAlign = "center";
	this.label.lineHeight = 26;
	this.label.lineWidth = 285;
	this.label.parent = this;
	this.label.setTransform(0.25,-4.6);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#D3D3D3","#848484"],[0,0.494],-122.8,-88.5,-31,98.6).ss(2,1,1).p("A2Qi7MAshAAAQAyAAAABLIAADhQAABLgyAAMgshAAAQgyAAAAhLIAAjhQAAhLAyAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// bg
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#EAEAEA","#CCCCCC"],[0,0.824],-84.1,-181.2,84.2,181.3).s().p("A2QC7QgyABAAhLIAAjhQAAhLAyABMAshAAAQAygBAABLIAADhQAABLgygBg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_headerSmall, new cjs.Rectangle(-148.5,-19.7,297,41.3), null);


(lib.stats_header = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new cjs.Text("Label", "bold 14px 'Tahoma'", "#333333");
	this.label.name = "label";
	this.label.textAlign = "center";
	this.label.lineHeight = 19;
	this.label.lineWidth = 285;
	this.label.parent = this;
	this.label.setTransform(0.25,-6);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#D3D3D3","#848484"],[0,0.494],-122.8,-59,-31,65.7).ss(2,1,1).p("A2Qh8MAshAAAQAyAAAAAyIAACVQAAAygyAAMgshAAAQgyAAAAgyIAAiVQAAgyAyAAg");
	this.shape.setTransform(0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// bg
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#EAEAEA","#CCCCCC"],[0,0.824],-84.1,-120.8,84.2,120.9).s().p("A2QB9QgyAAAAgyIAAiVQAAgyAyAAMAshAAAQAyAAAAAyIAACVQAAAygyAAg");
	this.shape_1.setTransform(0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_header, new cjs.Rectangle(-148.5,-13.6,297,27), null);


(lib.stats_entrySmall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// label
	this.label = new cjs.Text("Label", "bold 20px 'Tahoma'", "#333333");
	this.label.name = "label";
	this.label.lineHeight = 26;
	this.label.lineWidth = 143;
	this.label.parent = this;
	this.label.setTransform(-141.05,-8.45);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	// value
	this.value = new cjs.Text("Value", "20px 'Tahoma'", "#333333");
	this.value.name = "value";
	this.value.textAlign = "right";
	this.value.lineHeight = 26;
	this.value.lineWidth = 242;
	this.value.parent = this;
	this.value.setTransform(140.75,-8.45);

	this.timeline.addTween(cjs.Tween.get(this.value).wait(1));

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#D3D3D3","#848484"],[0,0.494],-122.8,-88.5,-31,98.6).ss(2,1,1).p("A2Qi7MAshAAAQAyAAAABLIAADhQAABLgyAAMgshAAAQgyAAAAhLIAAjhQAAhLAyAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// bg
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#EAEAEA","#CCCCCC"],[0,0.824],-84.1,-181.2,84.2,181.3).s().p("A2QC7QgyABAAhLIAAjhQAAhLAyABMAshAAAQAygBAABLIAADhQAABLgygBg");

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_entrySmall, new cjs.Rectangle(-148.5,-19.7,297,39.5), null);


(lib.log_entry = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// tBox
	this.tBox = new cjs.Text("Label", "12px 'Tahoma'", "#333333");
	this.tBox.name = "tBox";
	this.tBox.lineHeight = 17;
	this.tBox.lineWidth = 286;
	this.tBox.parent = this;
	this.tBox.setTransform(-143,-5.65);

	this.timeline.addTween(cjs.Tween.get(this.tBox).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.log_entry, new cjs.Rectangle(-145,-7.6,290,40), null);


(lib.stats_frame_inner = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#C1C1C1","#848484"],[0,0.494],-151,-128.3,117.4,-128.3).ss(5,1,1).p("EgWLgvGMAsXAAAQBQAAAABQMAAABbtQAABQhQAAMgsXAAAQhQAAAAhQMAAAhbtQAAhQBQAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_frame_inner, new cjs.Rectangle(-152.5,-304,305,608), null);


(lib.stats_entry = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// button_entry
	this.button_entry = new lib.button_entry();
	this.button_entry.name = "button_entry";
	this.button_entry.setTransform(0,-0.1);
	this.button_entry.alpha = 0.0117;
	new cjs.ButtonHelper(this.button_entry, 0, 1, 2, false, new lib.button_entry(), 3);

	this.timeline.addTween(cjs.Tween.get(this.button_entry).wait(1));

	// label
	this.label = new cjs.Text("Label", "bold 14px 'Tahoma'", "#333333");
	this.label.name = "label";
	this.label.lineHeight = 19;
	this.label.lineWidth = 143;
	this.label.parent = this;
	this.label.setTransform(-142.45,-6);

	this.timeline.addTween(cjs.Tween.get(this.label).wait(1));

	// value
	this.value = new cjs.Text("Value", "12px 'Tahoma'", "#333333");
	this.value.name = "value";
	this.value.textAlign = "right";
	this.value.lineHeight = 17;
	this.value.lineWidth = 242;
	this.value.parent = this;
	this.value.setTransform(142.15,-6);

	this.timeline.addTween(cjs.Tween.get(this.value).wait(1));

	// frame
	this.shape = new cjs.Shape();
	this.shape.graphics.f().ls(["#D3D3D3","#848484"],[0,0.494],-122.8,-59,-31,65.7).ss(2,1,1).p("A2Qh8MAshAAAQAyAAAAAyIAACVQAAAygyAAMgshAAAQgyAAAAgyIAAiVQAAgyAyAAg");
	this.shape.setTransform(0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// bg
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#EAEAEA","#CCCCCC"],[0,0.824],-84.1,-120.8,84.2,120.9).s().p("A2QB9QgyAAAAgyIAAiVQAAgyAyAAMAshAAAQAyAAAAAyIAACVQAAAygyAAg");
	this.shape_1.setTransform(0,-0.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_entry, new cjs.Rectangle(-148.5,-13.6,297,27), null);


(lib.stats_frameSmall = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// frame
	this.frame = new lib.stats_frame_innerSmall();
	this.frame.name = "frame";
	this.frame.setTransform(0.05,0);

	this.timeline.addTween(cjs.Tween.get(this.frame).wait(1));

	// mask_holder (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AqoXkQgnAAAAgoMAAAgt3QAAgoAnAAIVRAAQAnAAAAAoMAAAAt3QAAAognAAg");

	// holder_values
	this.holder_values = new lib.holder_default();
	this.holder_values.name = "holder_values";
	this.holder_values.setTransform(0,0,0.48,0.5);

	var maskedShapeInstanceList = [this.holder_values];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.holder_values).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#EFEFEF"],[0,0.494],-64.9,-32,65,32.1).s().p("AqoXkQgnAAAAgoMAAAgt3QAAgoAnAAIVRAAQAnAAAAAoMAAAAt3QAAAognAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_frameSmall, new cjs.Rectangle(-74.4,-153.2,149,306.5), null);


(lib.stats_frame = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// frame
	this.frame = new lib.stats_frame_inner();
	this.frame.name = "frame";
	this.frame.alpha = 0.9883;

	this.timeline.addTween(cjs.Tween.get(this.frame).wait(1));

	// mask_holder (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgWLAvHQhQAAAAhQMAAAhbtQAAhQBQAAMAsXAAAQBQAAAABQMAAABbtQAABQhQAAg");

	// holder_values
	this.holder_values = new lib.holder_default();
	this.holder_values.name = "holder_values";

	var maskedShapeInstanceList = [this.holder_values];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.holder_values).wait(1));

	// title
	this.title = new cjs.Text("Person Test 001", "bold 24px 'Tahoma'", "#C1C1C1");
	this.title.name = "title";
	this.title.textAlign = "center";
	this.title.lineHeight = 29;
	this.title.lineWidth = 171;
	this.title.parent = this;
	this.title.setTransform(0,223.6);

	this.timeline.addTween(cjs.Tween.get(this.title).wait(1));

	// bg
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#FFFFFF","#EFEFEF"],[0,0.494],-135.3,-64,135.4,64.2).s().p("EgWLAvHQhQAAAAhQMAAAhbtQAAhQBQAAMAsXAAAQBQAAAABQMAAABbtQAABQhQAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stats_frame, new cjs.Rectangle(-152.5,-304,305,608), null);


// stage content:
(lib.personTest001 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// holder_controls
	this.holder_controls = new lib.holder_default();
	this.holder_controls.name = "holder_controls";

	this.timeline.addTween(cjs.Tween.get(this.holder_controls).wait(1));

	// holder_stats
	this.holder_stats = new lib.holder_default();
	this.holder_stats.name = "holder_stats";
	this.holder_stats.setTransform(0,52.2);

	this.timeline.addTween(cjs.Tween.get(this.holder_stats).wait(1));

	// holder_person
	this.holder_person = new lib.holder_default();
	this.holder_person.name = "holder_person";
	this.holder_person.setTransform(0,99.3);

	this.timeline.addTween(cjs.Tween.get(this.holder_person).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,0,0);
// library properties:
lib.properties = {
	id: '7D0D6568C84F014F9AAF26D6AF974708',
	width: 550,
	height: 800,
	fps: 24,
	color: "#333333",
	opacity: 1.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['7D0D6568C84F014F9AAF26D6AF974708'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;