from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest

#A python dict held in a seperate file determining test URLS
from urls import test_urls


class UnitTest(unittest.TestCase):

    def setUp(self):
        self.test_url = test_urls['local']
        self.subsid = "4296"
        self.url_query = self.test_url + "?subsid=" + self.subsid

        # create a new Firefox session
        self.driver = webdriver.Firefox()
        self.driver.implicitly_wait(5)

    def tearDown(self):
        self.driver.quit()

    def test_loading_page_without_id_gives_error(self):
        self.driver.get(self.test_url)
        message = self.driver.find_element_by_id('message')

        expected = "You seem to have got here by accident."
        observed = message.text

        self.assertIn(expected, observed)
        polis_container = self.driver.find_element_by_id('polis-container')
        self.assertFalse(polis_container.is_displayed())

    def test_loading_page_with_subsid_shows_iframe(self):
        self.driver.get(self.url_query)
        polis_container = self.driver.find_element_by_id('polis-container')
        self.assertTrue(polis_container.is_displayed())

    def test_dynata_button_isnt_visible_until_iframe_clicked(self):
        self.driver.get(self.url_query)

        voted_button = self.driver.find_elements_by_id('voted')
        self.assertEqual(0, len(voted_button), "Can see button but shouldn't")

        polis_container = self.driver.find_element_by_id('polis-container')
        polis_container.click()
        voted_button = self.driver.find_elements_by_id('voted')
        self.assertEqual(1, len(voted_button), "Can't see button but want to")
