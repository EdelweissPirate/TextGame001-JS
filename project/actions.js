const actions = {
    // TODO- add parent stuff etc
    // TODO- at end of all actions, send back to lifeLog??

    returnToLog: () => {
        controls.showBox(props.lifeLog_box);
    },

    ingratiate: (thisPerson) => {
        actions.returnToLog();
    },
    antagonise: (thisPerson) => {
        actions.returnToLog();
    },
    befriend: (thisPerson) => {
        actions.returnToLog();
    },
    flirt: (thisPerson) => {
        // if same life stage
        actions.returnToLog();
    },
    converse: (thisPerson) => {
        actions.returnToLog();
    },
    ask_to_tutor: (thisPerson) => {
        actions.returnToLog();
    },
    give_money: (thisPerson) => {
        actions.returnToLog();
    },
    bully: (thisPerson) => {
        actions.returnToLog();
    },
    suck_up: (thisPerson) => {
        actions.returnToLog();
    },
    skip_school: (thisPerson) => {
        actions.returnToLog();
    },
    do_homework: (thisPerson) => {
        actions.returnToLog();
    },
    drop_out: (thisPerson) => {
        actions.returnToLog();
    },
};