from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest

#A python dict held in a seperate file determining test URLS
from urls import test_urls

class UnitTest(unittest.TestCase):

    def setUp(self):
        # URLs for

        # create a new Firefox session
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        # navigate to the application home page
        self.driver.get(test_urls['local'])
  
    def test_loading_page_without_id_gives_error(self):
        message = self.driver.find_element_by_id('message')

        expected = "You seem to have got here by accident."
        observed = message.text

        self.assertIn(expected, observed)
        polis_container = self.driver.find_element_by_id('polis-container')
        self.assertFalse(polis_container.is_displayed())

