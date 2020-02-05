# WebPageEditor for Google Chrome
Edit your current webpage and save/download specific part of it.

----
## Building for use
### Load unpacked extension
* Open the `chrome://extensions` page.
* Enable the **Developer mode**.
* Click **Load unpacked extension** button.
* Navigate to the project's folder.

### Create Config.json
Create a `.json` file look like this:

    {
      "downloadTarget": "#main",
      "outputFileName": "SAMPLE.shtml",
      "elements": [
        {
          "NAME": "GOOGLE ICON",
          "CSS_SELECTOR": "#hplogo"
        }
      ]
    }

* **downloadTarget** : `CSS Selector` of the element you want to download.
* **ouputFileName** : the name of downloaded file.
* **elements** : an `array` of the elements you want to modified that contains name of the element and its `CSS Selector`.

### Import Config.json
* Click **WebPageEditor Icon** to open the popup panel.
* Click **OPTIONS button**.
* Enter **OPTIONS page**.
* Click **CHOOSE CONFIG FILE button**.
* Navigate to the **Config.json** you created.
* You can also modified the json in the `textarea`.
* Click **SAVE button**.
* Leave **OPTIONS page**.

----
## Selectboxes on the popup panel
### Selectors(top-left corner)
Selectors assigned to the **elements** in your **Config.json**.

### Actions(top-right corner)
* **Only Select** : Turn on the selecting mode, **click** to select the element you want to **clone**.
* **Edit Text** : Edit the **text** of the elements.
* **Edit Link** : **Doubleclick** to edit the `href` attribute of the element.
* **Edit Reference** : **Doubleclick** to edit the `src` attribute of the element.
* **Show all (display block)** : Add a class contains `display: block` to show the elements.
* **Hide all (display none)** : Add a class contains `display: none` to hide the elements.
* **Add data-attribute** : **Doubleclick** to add a [data-attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) on the element.
* **Edit data-attribute** : **Doubleclick** to edit a [data-attribute](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) on the element.

----
## Buttons on the popup panel
* **APPLY** : Apply the  **current option** of selector/actions selectbox to your current chrome tab.
* **COPY BEFORE** : Copy the element you selected and insert **before** itself.
* **COPY AFTER** : Copy the element you selected and insert **after** itself.
* **DONE** : Turn off the selecting mode and remove all classes and listeners.
* **DOWNLOAD** : Download part of the page. The range was declared in **downloadTarget**.
* **OPTIONS** : Open the **OPTIONS page**.

----
## Usage
### Change src of an img tag
* Click **WebPageEditor Icon** to open the popup panel.
* Select an option of **Selector selectbox**.
* Select **Edit Reference** of **Action selectbox**.
* Click **APPLY button**.
* **Doubleclick** the image.
* Edit the reference.
* Click **WebPageEditor Icon** to open the popup panel.
* (Click **DONE button**)
* Click **DOWNLOAD button**.
