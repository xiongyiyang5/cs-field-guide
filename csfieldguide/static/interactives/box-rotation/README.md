# WebGL 3D Box Rotation

**Created by:** Hayley van Waas
**Modified by:** Alasdair Smith

This interactive allows the rotation of an object in 3D space for users to identify which side is coloured.

## Required files

This interactive shares a large amount of source code with the Box Translation interactive, for this reason most source files are in shared folders. When editing this interactive, please check that changes do not adversely affect the behaviour of the Box Translation interactive.

The location of relevant files for this interactive in the shared folders are given here:

    static/
    ├── img/interactives/
    │   ├── colourful-box-images/*
    │   └── translation-rotation-interactives-images/*
    ├── js/
    │   ├── third-party/threejs/Detector.js
    │   └── translation-rotation-interactives/*
    └── scss/
        └── translation-rotation-interactives/*

In addition, this interactive also requires two third-party libraries:

- tween.js
- three

## Licences

The third-party libraries `three.js` and `tween.js` are used in these interactives, their corresponding licence files are included in the `third-party-licences` directory.
The `Detector.js` file was obtained as part of the `three.js` library, and its use is covered under the same licence.