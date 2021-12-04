const lifeLog = {
    entries: 0,
    //TODO //IMPORTANT - MAKE LIFELOG PLAYER SPECIFIC INSTEAD OF PERSON!!
    init: () => {
        let lib = props.library;

        props.lifeLog_box = new lib.stats_frame();
        _.holder_stats.addChild(props.lifeLog_box);

        props.lifeLog_box.x = 225;
        props.lifeLog_box.y = 270;

        lifeLog.entries = 0;
        
        props.info_boxes.push(props.lifeLog_box);
    },

    addEntry: (event, ageUp) => {
        if(props.player.alive){
            let lib = props.library;

            let newEntry = new lib.log_entry();
            props.lifeLog_box.holder_values.addChild(newEntry);

            newEntry.num = lifeLog.entries;

            if(event == null){
                newEntry.tBox.text = lifeEvents.general.ageUp.logContent() + lifeEvents.general.blank.logContent();;
            } else if(ageUp){
                newEntry.tBox.text = lifeEvents.general.ageUp.logContent() + event.logContent();
            } else {
                newEntry.tBox.text = event.logContent();
            };

            let thisBoxBounds;

            thisBoxBounds = newEntry.getBounds();
            
            newEntry.frame = new createjs.Shape();
            newEntry.addChild(newEntry.frame);

            newEntry.frame.graphics.setStrokeStyle(2, 'round', 'round').beginStroke('#a6a6a6');
            newEntry.frame.graphics.drawRoundRect(-295/2, -12.5, 295, thisBoxBounds.height + 10, 8);

            if(newEntry.num != 0){
                let prevBox = props.player.lifeLog_entries[newEntry.num - 1];
                let prevBoxBounds = prevBox.getBounds();
                let prevBoxHeight = prevBoxBounds.height; 
                
                newEntry.x = 0;
                newEntry.y = (prevBox.y + prevBoxHeight) + 15; //10
            } else {
                newEntry.x = 0;
                newEntry.y = -(288 - (26 * lifeLog.entries));
            };

            props.player.lifeLog_entries.push(newEntry);
            lifeLog.entries++;

            //scrolls log up as entries are added
            if(newEntry.y + (thisBoxBounds.height) >= 230){
                props.lifeLog_box.holder_values.y -= (thisBoxBounds.height + 15);
            };

            bringToFront(props.lifeLog_box.frame);
        }
    },
};