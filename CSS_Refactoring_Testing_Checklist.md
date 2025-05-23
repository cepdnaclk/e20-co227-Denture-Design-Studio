# CSS Refactoring Manual Testing Checklist - Denture Design Studio

**Objective:** To manually verify that the CSS refactoring work has fixed CSS errors/bugs and made the web application compatible across all common devices and screen sizes.

**Developer:** _________________________
**Date:** _________________________
**Browser(s) Used:** _________________________

---

## 1. General Responsive Behavior

**Instructions:** Test on a resizable desktop browser window and using browser developer tools for specific device emulation and orientation changes.

| #   | Item                                                                                                | Test Steps                                                                                                                              | Pass/Fail | Notes (If Fail, describe issue) |
| --- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| 1.1 | **Fluid Resizing (Desktop)**                                                                        | Gradually resize the browser window from very narrow to very wide.                                                                      |           |                                 |
|     | - Element Adjustments                                                                               | Observe if elements adjust their size, position, and layout smoothly without abrupt changes or breaking the layout.                     |           |                                 |
|     | - No Overlaps/Breaking                                                                              | Ensure no elements overlap unexpectedly or break out of their containers.                                                               |           |                                 |
| 1.2 | **Common Breakpoints (Manual Resize or DevTools)**                                                    | Set viewport to common widths:                                                                                                          |           |                                 |
|     | - Mobile (Portrait): 320px                                                                          | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Mobile (Portrait): 360px                                                                          | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Mobile (Portrait): 480px                                                                          | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Tablet (Portrait): 768px                                                                          | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Tablet (Landscape): 810px (or 1024px height with 768px width for landscape)                       | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Desktop: 1024px                                                                                   | Check overall layout, readability.                                                                                                      |           |                                 |
|     | - Desktop: 1280px                                                                                   | Check overall layout, readability.                                                                                                      |           |                                 |
|     | - Desktop: 1440px                                                                                   | Check overall layout, readability.                                                                                                      |           |                                 |
|     | - Desktop: 1920px                                                                                   | Check overall layout, readability.                                                                                                      |           |                                 |
| 1.3 | **Device Emulation (Browser DevTools)**                                                             | Select a few common devices:                                                                                                            |           |                                 |
|     | - iPhone SE / iPhone 8                                                                              | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - iPhone X/11/12/13/14/15                                                                           | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - Common Android (e.g., Pixel 5, Samsung Galaxy S20)                                                | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
|     | - iPad Air / iPad Pro (Portrait & Landscape)                                                        | Check overall layout, readability, tap target sizes.                                                                                    |           |                                 |
| 1.4 | **Orientation Changes (DevTools or Physical Device if available)**                                    | For relevant devices (mobiles, tablets):                                                                                                |           |                                 |
|     | - Switch from Portrait to Landscape                                                                 | Ensure layout adapts correctly, content remains accessible, no overlaps.                                                                |           |                                 |
|     | - Switch from Landscape to Portrait                                                                 | Ensure layout adapts correctly, content remains accessible, no overlaps.                                                                |           |                                 |

---

## 2. Layout Integrity

| #   | Item                                                                | Test Steps                                                                                                              | Pass/Fail | Notes (If Fail, describe issue) |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| 2.1 | **No Element Overlaps**                                             | Across all tested sizes/devices, visually inspect for any elements that improperly overlap each other.                    |           |                                 |
| 2.2 | **No Unexpected Wrapping/Breaking**                                   | Ensure text containers, buttons, and other elements wrap content as expected, or scale without breaking their container.  |           |                                 |
| 2.3 | **No Horizontal Scrollbars**                                        | Unless content intrinsically requires it (e.g., a very wide data table, specific image viewer), no horizontal scrollbar should appear at any viewport size. |           |                                 |
| 2.4 | **Element Alignment**                                               | Check for proper alignment of elements (text, images, buttons) as per design intent (e.g., centered, left/right aligned). |           |                                 |
| 2.5 | **Footer (if applicable)**                                          | If a footer exists, ensure it stays at the bottom of the viewport or content, as designed.                                |           |                                 |
| 2.6 | **Fixed Headers (e.g., `UserAccount.css`)**                         | Ensure fixed headers remain fixed at the top, do not obscure important content, and behave correctly during scrolling.        |           |                                 |

---

## 3. Typography and Readability

| #   | Item                                                                    | Test Steps                                                                                                                            | Pass/Fail | Notes (If Fail, describe issue) |
| --- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| 3.1 | **Font Size Legibility (`clamp()` usage)**                              | Across all screen sizes:                                                                                                              |           |                                 |
|     | - Mobile: Text is not too small.                                        | Verify text can be read comfortably without zooming.                                                                                  |           |                                 |
|     | - Desktop: Text is not excessively large.                               | Verify text scales appropriately and doesn't look oversized.                                                                          |           |                                 |
| 3.2 | **Line Spacing (Leading)**                                              | Check that line spacing is adequate for readability on all devices.                                                                   |           |                                 |
| 3.3 | **Text Wrapping**                                                       | Ensure text wraps correctly within its container and does not overflow or create awkward breaks.                                        |           |                                 |
| 3.4 | **No Unintended Text Truncation**                                       | Verify that no text is cut off unless it's an intentional design feature (e.g., handled with CSS ellipses and a tooltip).               |           |                                 |

---

## 4. Interactivity and Usability

| #   | Item                                                                  | Test Steps                                                                                                                   | Pass/Fail | Notes (If Fail, describe issue) |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| 4.1 | **Button/Interactive Element Target Size**                              | On touch devices (emulated or physical), ensure buttons, links, and other interactive elements are large enough to be easily tapped. |           |                                 |
| 4.2 | **Hover States (Desktop)**                                              | Hover over buttons, links, and other interactive elements. Verify a clear visual change.                                       |           |                                 |
| 4.3 | **Focus States (Keyboard Navigation)**                                  | Use the Tab key to navigate through interactive elements. Verify a clear visual focus indicator appears for each element.      |           |                                 |
| 4.4 | **Modal Dialogs / Pop-ups (e.g., `ActualorAssessor.css`)**              | Trigger any modals or pop-ups:                                                                                               |           |                                 |
|     | - Correct Sizing                                                      | Ensure the modal is appropriately sized for the viewport (not too big, not too small).                                       |           |                                 |
|     | - Correct Positioning                                                 | Ensure the modal is correctly positioned (e.g., centered).                                                                   |           |                                 |
|     | - Overlay Behavior                                                    | If there's an overlay, ensure it covers the page content and the modal is on top.                                              |           |                                 |
|     | - Responsiveness                                                      | Check modal appearance and usability on different screen sizes.                                                              |           |                                 |

---

## 5. Component-Specific Checks

**5.1 `TeethComp` (`Teeth.css`, `Gingivally.css`, etc.)**

| #    | Item                                                              | Test Steps                                                                                                                                                                                             | Pass/Fail | Notes (If Fail, describe issue) |
| ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------- |
| 5.1.1| **`teethBackground2` Container Scaling**                          | Verify the main container for the teeth diagram scales according to its `clamp()` values (min-width 250px, preferred 24vw, max-width 400px).                                                               |           |                                 |
| 5.1.2| **`teeth-btn` Visibility & Positioning (All 32)**                 | At various breakpoints (small mobile, tablet, desktop), check that all 32 tooth buttons are visible and appear in their generally correct anatomical positions. Note any major misalignments.         |           |                                 |
| 5.1.3| **Button & Image Scaling**                                        | Ensure the `teeth-btn` elements and their internal images scale correctly (images should `object-fit: contain` within the button's `clamp()`-defined size).                                                |           |                                 |
| 5.1.4| **Other `TeethComp` CSS files (Gingivally, Plate, Rest, etc.)**   | Spot-check a few buttons/elements from these related CSS files to ensure their positioning and scaling are reasonable within the `teethBackground2` context. (Many use `vw` based image widths internally). |           |                                 |

**5.2 Homepage Variations (`Homepage.css`, `AdminHome.css`, `AssessorHome.css`, `StudentHome.css`)**

| #    | Item                                                              | Test Steps                                                                                                                                                                                             | Pass/Fail | Notes (If Fail, describe issue) |
| ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------- |
| 5.2.1| **Background Image/Gradient**                                     | Verify that the full-screen background images and/or gradients cover the entire viewport correctly without unexpected gaps or scrollbars.                                                                |           |                                 |
| 5.2.2| **Layout of Text, Logos, Buttons**                                | For each homepage type, check at different breakpoints (small mobile, tablet, desktop):                                                                                                                |           |                                 |
|      | - `Homepage.css`: Welcome text, app name, logo, login/signup buttons. | Ensure elements are centered/positioned as per design, stack correctly on mobile (e.g., buttons).                                                                                                        |           |                                 |
|      | - `Admin/Assessor/StudentHome.css`: Main title (`<h1>`).         | Ensure title is responsive and centered.                                                                                                                                                               |           |                                 |
|      | - `Admin/Assessor/StudentHome.css`: Decorative headings (#adminh1, etc.) | Check their positioning (now % based). Note if they are significantly off or if the `display: none` on mobile (as suggested in refactor comments) is appropriate.                                    |           |                                 |

**5.3 `AddConnectors.css`**

| #    | Item                                                              | Test Steps                                                                                                                                                                                             | Pass/Fail | Notes (If Fail, describe issue) |
| ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------- |
| 5.3.1| **Main Title & "Done" Button**                                    | Verify the `.AddConnectors` title and `.Done` button are responsive in size and position.                                                                                                              |           |                                 |
| 5.3.2| **`ul.connectors-list` & `li` Elements**                          | - Check text wrapping within `li` (should be `white-space: normal`).<br/>- Check positioning of the list and its items at various breakpoints.<br/>- **On small mobile (e.g., 480px):** Verify items stack vertically. |           |                                 |
| 5.3.3| **Absolutely Positioned Connector Parts**                         | Check elements like `#upper`, `#minor`, `.lower-connector`, etc. for reasonable placement. These had `vw`/`vh` units converted to `%`/`rem`. Note any major misalignments.                               |           |                                 |

**5.4 `UserAccount.css`**

| #    | Item                                                              | Test Steps                                                                                                                                                                                             | Pass/Fail | Notes (If Fail, describe issue) |
| ---- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------- |
| 5.4.1| **Fixed Header**                                                  | Ensure the `.userheader` remains fixed at the top, is legible, and content scrolls correctly underneath it.                                                                                            |           |                                 |
| 5.4.2| **Account List Scrollability**                                    | If there are enough accounts to overflow, verify the `.account-list` is scrollable.                                                                                                                    |           |                                 |
| 5.4.3| **`.account-item` Layout**                                        | - **Desktop/Tablet:** Verify items are in a row (icon, name, role, button).<br/>- **Small Mobile (e.g., 480px):** Verify items stack into a column layout.                                                 |           |                                 |
| 5.4.4| **Button Responsiveness**                                         | Check that `.delete-button` and `.reset-button` scale appropriately and stack on mobile.                                                                                                               |           |                                 |

**5.5 `ActualorAssessor.css` (Modal in Student Home)**

| #    | Item                                                              | Test Steps                                                                                                                                                           | Pass/Fail | Notes (If Fail, describe issue) |
| ---- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------- |
| 5.5.1| **Modal Appearance**                                              | Trigger the modal. Check its size (`clamp()` based), positioning (centered), and overall appearance on different screen sizes.                                       |           |                                 |
| 5.5.2| **Button Layout**                                                 | Verify `.cancel-btn` is top-right. Verify `.genarate-btn` and `.actual-btn` are centered horizontally and stacked vertically with appropriate spacing.                 |           |                                 |
| 5.5.3| **Responsiveness of Buttons**                                     | Ensure buttons within the modal are responsive (size, font) and maintain usability on small screens.                                                                   |           |                                 |

---

## 6. Cross-Browser Checks (Optional but Recommended)

**Instructions:** Briefly open the application in the latest versions of major browsers. Focus on identifying any glaring inconsistencies or broken layouts.

| #   | Browser         | Works as Expected (Yes/No) | Notes (If No, describe major issues) |
| --- | --------------- | -------------------------- | ------------------------------------ |
| 6.1 | Google Chrome   |                            |                                      |
| 6.2 | Mozilla Firefox |                            |                                      |
| 6.3 | Apple Safari    |                            |                                      |
| 6.4 | Microsoft Edge  |                            |                                      |

---

**Overall Test Result:** Pass / Fail

**Summary of Critical Issues (if any):**

________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

**Sign-off:** _________________________
