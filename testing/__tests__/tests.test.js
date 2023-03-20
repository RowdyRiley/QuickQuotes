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
    it('Starts on LoginScreen', async () => {
        render(<App />);
        const quoteFeed = await waitFor(() => screen.queryAllByText('QuickQuotes'));
        expect(quoteFeed.length).toBe(1);
    });

    it('LoginPage then to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('Settings Button Navigation', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });    
        expect(screen.queryAllByText("Bookmarks").length).toBe(1);
    });

    it('Subjects Button Navigation', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });   
        expect(screen.queryAllByText("Add new +").length).toBe(1);
    });

    it('To Subjects then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        let a = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(a[1]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        let a = screen.queryAllByText("QuoteFeed");
        act(() => {
            fireEvent.press(a[1]);
        });
        expect(screen.queryAllByText("Quote Feed").length).toBe(1);
    });

    it('To Settings then to Bookmarks', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Bookmarks"));
        });
        expect(screen.queryAllByText("Bookmarks").length).toBe(2);  // 2 because it includes the Bookmarks button from the Settings page
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        expect(screen.queryAllByText("Settings").length).toBe(1);
    });

    it('To Subjects then to Settings Then Back to QuoteFeed', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
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
            fireEvent.press(screen.getByText("Press to Enter"));
        });
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

    it('To Settings then back to Home Screen', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Settings"));
        });
        act(() => {
            fireEvent.press(screen.getByText("Logout"));
        });
        expect(screen.queryAllByText("QuickQuotes").length).toBe(1);
    });
});

describe('QuoteFeed', () => {
    it('Give Me a Quote! Button Exists', () => {
        render(<App />);
        act(() => {
            fireEvent.press(screen.getByText("Press to Enter"));
        });
        expect(screen.queryAllByText("Give me a quote!").length).toBe(1);
    });

    // it('Give Me a Quote Button Functionality', () => {                 
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
            fireEvent.press(screen.getByText("Press to Enter"));
        });

        act(() => {
            fireEvent.press(screen.getByText("Subjects"));
        });
        expect(screen.queryAllByText("Add new +").length).toBe(1);
    });

    // it('Subjects fetch ', () => {                  
    //     render(<App />);

    //     act(() => {
    //         fireEvent.press(screen.getByText("Press to Enter"));
    //     });

    //     act(() => {
    //         fireEvent.press(screen.getByText("Subjects"));
    //     });
    //     //await findByText('anatomy');
    //     // Find the dropdown list and click it to open options
        
    //     act(() => {
    //         fireEvent.press(screen.getByText("Add new +"));
    //     });
    //     //const dropdown = screen.findByTestId('select');
    //     //fireEvent.press(dropdown);

    //     // Assert that 'anatomy' is visible in the dropdown options
    //     // const anatomyOption = screen.findByText('anatomy');
    //     // expect(anatomyOption).toBeVisible();
    //     //expect(screen.queryAllByText("anatomy").length).toBe(1);
    //     expect(screen.getByLabelText("Subject")).toBeTruthy();
    //     expect(screen.getByLabelText("Subject").props.placeholder).toBe("anatomy");
    // });

    // it('Fetches Data', async () => {                  
    //     render(<App />);

    //     act(() => {
    //         fireEvent.press(screen.getByText("Press to Enter"));
    //     });
      
    //     act(() => {
    //       fireEvent.press(screen.getByText("Subjects"));
    //     });
      
    //     await waitFor(() => {
    //       expect(screen.getByText('Add new +')).toBeTruthy();
    //     });
      
    //     const dropdown = await screen.findByTestId('select');
    //     act( () => {
    //       fireEvent.press(dropdown);
    //     });
    //     const anatomyOption = await screen.findByText('anatomy');
    //     expect(anatomyOption).toBeVisible();
    // });
      
});

// describe('Settings', () => {

// });
