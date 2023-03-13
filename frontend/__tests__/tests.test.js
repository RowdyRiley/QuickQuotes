import React from 'react';
import renderer from 'react-test-renderer';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, screen, fireEvent, waitFor } from "@testing-library/react-native";
import { act } from 'react-test-renderer';

import App from '../App';

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree = renderer.create(<App />).toJSON();
//     expect(tree.children.length).toBe(1);
//   });
// });

describe('Navigation', () => {
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
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });    
        expect(screen.queryAllByText("Notification Frequency").length).toBe(1);
    });

    it('Subjects Button Navigation', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });   
        expect(screen.queryAllByText("Add new +").length).toBe(1);
    });

    it('To Subjects then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        let a = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(a[0]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        //fireEvent.press(screen.getByText("Settings"));
        let a = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(a[0]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Subjects then to Settings Then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        let a = screen.queryAllByText("Settings");
        act(() => {
            fireEvent.press(a[0]);
        });
        let b = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(b[0]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then to Subjects Then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        let a = screen.queryAllByText("Subjects");
        act(() => {
            fireEvent.press(a[0]);
        });
        let b = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(b[0]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });
});

describe('QuoteFeed', () => {
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

    // it('Subjects', () => {                 
    //     render(<App />);
    //     act(() => {
    //         fireEvent.press(screen.getByText("Settings"));
    //     });
    //     act(() => {
    //         fireEvent.press(screen.getByText("Notification Frequency"));
    //     });
    //     //expect(screen.queryAllByText("Add new +").length).toBe(1);
    //     expect(screen.queryAllByText("1").length).toBe(1);
    // });
    // let newCount = Number( screen.getByLabelText('').children[0],//   );
});

describe('Subjects', () => {
    it('Subjects', () => {                 
        render(<App />);

        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        expect(screen.queryAllByText("Add new +").length).toBe(1);
    });

    it('Subjects fetch ', () => {                  
        render(<App />);

        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        //await findByText('anatomy');
        // Find the dropdown list and click it to open options
        const dropdown = screen.findByTestId('select');
        fireEvent.press(dropdown);
        // Assert that 'anatomy' is visible in the dropdown options
        const anatomyOption = screen.findByText('anatomy');
        expect(anatomyOption).toBeVisible();
    });

    it('Fetches Data', async () => {                  
        render(<App />);
      
        act(() => {
          fireEvent.press(screen.getByText("Subjects"));
        });
      
        await waitFor(() => {
          expect(screen.getByText('Add new +')).toBeTruthy();
        });
      
        const dropdown = await screen.findByTestId('select');
        await act(async () => {
          fireEvent.press(dropdown);
        });
        const anatomyOption = await screen.findByText('anatomy');
        expect(anatomyOption).toBeVisible();
    });
      
});
















// instructions:

// installed the renderer and library using --legacy-peer-deps

// ie. sudo npx expo install @testing-library/react-native -- --save-dev --legacy-peer-deps

// ie. sudo npm install --save-dev react-test-renderer@^18.1.0 --legacy-peer-deps

// sudo npm install @react-navigation/native --legacy-peer-deps (don't think this is needed)

// npm i --save react-native-safe-area-context@4.4.1

// "scripts": {
//     ...
//     "test": "jest"
//   },
//   "jest": {
//     "preset": "jest-expo"
//   }

// sudo npx expo install jest-expo jest -- --legacy-peer-deps

//https://stackoverflow.com/questions/70080213/syntaxerror-node-modules-react-native-libraries-polyfills-error-guard-js-miss (don't think this is needed)

// also changed the async import from screens to: import AsyncStorage from '@react-native-async-storage/async-storage'


