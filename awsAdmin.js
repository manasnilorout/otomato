'use strict';

require("@nut-tree/template-matcher");
const { centerOf, keyboard, Key, imageResource, mouse, screen, straightTo, sleep } = require("@nut-tree/nut-js");
const { join } = require('path');


const doThis = async () => {
    keyboard.config.autoDelayMs = 50;
    mouse.config.autoDelayMs = 50;
    screen.config.resourceDirectory = join(__dirname, 'assets');
    screen.config.autoHighlight = true;
    screen.config.highlightDurationMs = 1000;
    screen.config.confidence = 0.7;

    // If you are having difficulty selecting chrome then try open chrome from terminal by uncommenting code below
    // await keyboard.type(Key.LeftSuper);
    // await keyboard.type('open -a "Google Chrome"');
    // await keyboard.type(Key.Return);

    const moveMouseToSpecifiedRegionAndClick = async (regionName, timeOut = 8000) => {
        const region = await screen.find(imageResource(`${regionName}.png`));
        console.log(`Found region -> ${regionName}`);
        await screen.highlight(region);
        await mouse.move(straightTo(centerOf(region)));
        await mouse.leftClick();
        await sleep(timeOut);
    }


    await moveMouseToSpecifiedRegionAndClick('chrome', 1000);
    await moveMouseToSpecifiedRegionAndClick('aws_elevated');
    await moveMouseToSpecifiedRegionAndClick('privileged_access');
    await moveMouseToSpecifiedRegionAndClick('enable_privilege_prompt');

    const activatePrompt = await screen.findAll(imageResource('activate_prompt.png'));
    await mouse.move(straightTo(centerOf(activatePrompt[0])));
    await mouse.leftClick();
    await sleep(5000);

    const activateMemberDialouge = await screen.waitFor(imageResource('activate_member.png'));
    await screen.highlight(activateMemberDialouge);

    await moveMouseToSpecifiedRegionAndClick('reason_dialouge', 1000);
    await keyboard.type('Activating DRI role for work!');
    await keyboard.type(Key.Return);
    await keyboard.type('Checking some formulas stuff!');
    await moveMouseToSpecifiedRegionAndClick('activate_button', 10000);
};

doThis();
