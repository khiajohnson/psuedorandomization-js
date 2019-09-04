// Example stimuli lists
var fillers = ['F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12','F13','F14','F15','F16','F17','F18','F19','F20']
var control = ['Ctrl1','Ctrl2','Ctrl3','Ctrl4','Ctrl5','Ctrl6','Ctrl7']
var experimental = ['Expt1','Expt2','Expt3','Expt4','Expt5','Expt6','Expt7]

// Randomly set the condition
var condition = jsPsych.randomization.sampleWithoutReplacement(['control', 'experimental'], 1, [1, 1])[0];

// Shuffle the fillers and targets for the selected condition
    var exposure = jsPsych.randomization.shuffle(fillers);
    var targets;
    if (condition === 'control') {
        targets = jsPsych.randomization.shuffle(control)
    } else {
        targets = jsPsych.randomization.shuffle(experimental)
    }

// Generate a pseudorandomized set of indicies where the targets will be inserted into fillers
// Set pseudorandomization conditions inside while loop, currently burn-in of 7, and minimum 1 filler b/t targets

    var max = exposure.length + targets.length;
    var ins = [];
    while (ins.length < targets.length) {
        var n = Math.floor(Math.random() * max);
        
        // SET CONDITIONS HERE
        if (n > 7 && !ins.includes(n) && !ins.includes(n + 1) && !ins.includes(n - 1)) {
            ins.push(n);
        }
    }
    ins.sort(function (a, b) {
        return a - b
    });
    var i;
    for (i = 0; i < ins.length; i++) {
        var fs = targets.pop();
        exposure.splice(ins[i], 0, fs);
    }
    
//console.log(exposure);
