// installed the renderer and library using --legacy-peer-deps

// ie. npx expo install @testing-library/react-native -- --save-dev --legacy-peer-deps

// ie. sudo npm install --save-dev react-test-renderer@^18.1.0 --legacy-peer-deps

// sudo npm install @react-navigation/native --legacy-peer-deps?? is this needed...

// npm i --save react-native-safe-area-context@4.4.1


import React from 'react';
import renderer from 'react-test-renderer';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, screen, fireEvent } from "@testing-library/react-native";

import App from '../App';

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });

describe('QuoteFeed', () => {
    it('Title', () => {
        render(<App />);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('Starts on QuotesFeed', () => {
        //getByText("Settings");
        render(<App />);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('Settings Button', () => {
        render(<App />);
        expect(screen.queryAllByText("Settings").length).toBe(1);
    });

    it('Subjects Button', () => {
        render(<App />);
        expect(screen.queryAllByText("Subjects").length).toBe(1);
    });

    it('Settings Button Navigation', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Settings"));
        expect(screen.queryAllByText("Notification Frequency").length).toBe(1);
    });

    it('Subjects Button Navigation', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Subjects"));
        expect(screen.queryAllByText("Add new +").length).toBe(1);
    });

    it('To Subjects then Back to QuoteFeed', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Subjects"));
        let a = screen.queryAllByText("QuoteFeed");
        fireEvent.press(a[0]);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then Back to QuoteFeed', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Settings"));
        //fireEvent.press(screen.getByText("Settings"));
        let a = screen.queryAllByText("QuoteFeed");
        fireEvent.press(a[0]);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Subjects then to Settings Then Back to QuoteFeed', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Subjects"));
        let a = screen.queryAllByText("Settings");
        fireEvent.press(a[0]);
        let b = screen.queryAllByText("QuoteFeed");
        fireEvent.press(b[0]);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then to Subjects Then Back to QuoteFeed', () => {
        render(<App />);
        fireEvent.press(screen.getByText("Settings"));
        let a = screen.queryAllByText("Subjects");
        fireEvent.press(a[0]);
        let b = screen.queryAllByText("QuoteFeed");
        fireEvent.press(b[0]);
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('Give Me a Quote Button Exists', () => {
        render(<App />);
        expect(screen.queryAllByText("Give me a quote!").length).toBe(1);
    });

    // it('Give Me a Quote Button Functionality', () => {                  // could add a reset button to clear feed, which helps with testing, sets count to 0.
    //     render(<App />);
    //     fireEvent.press(screen.getByText("Give me a quote!"));

    //     // add testid to scrollview
    //     const textComponents = screen.getAllByTestId(testID="quotes-scrollview");
    //     expect(textComponents).toHaveLength(1); // assuming it starts at 0
    // });

    it('Subjects', () => {                  ////// could add a reset button to clear feed, which helps with testing, sets count to 0.
        render(<App />);
        fireEvent.press(screen.getByText("Subjects"));
        //expect(screen.queryAllByText("Add new +").length).toBe(1);
       // expect(screen.queryAllByText("astrophysics").length).toBe(1);
    });
    // let newCount = Number(
    //     screen.getByLabelText('count for Second Molly Channel').children[0],
    //   );
  });
















// instructions:

// installed the renderer and library using --legacy-peer-deps

// ie. sudo npx expo install @testing-library/react-native -- --save-dev --legacy-peer-deps

// ie. sudo npm install --save-dev react-test-renderer@^18.1.0 --legacy-peer-deps

// sudo npm install @react-navigation/native --legacy-peer-deps?? is this needed...

// npm i --save react-native-safe-area-context@4.4.1


// "scripts": {

//     ...

//     "test": "jest"

//   },

//   "jest": {

//     "preset": "jest-expo"

//   }


// sudo npx expo install jest-expo jest -- --legacy-peer-deps


//https://stackoverflow.com/questions/70080213/syntaxerror-node-modules-react-native-libraries-polyfills-error-guard-js-miss

  


// also changed the async import from screens to: import AsyncStorage from '@react-native-async-storage/async-storage'

 //Need index.js?


