from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import unittest
import time


#A python dict held in a seperate file determining test URLS
from urls import test_urls


class UnitTest(unittest.TestCase):

    def setUp(self):
        #self.test_url = test_urls['staging']
        self.test_url = test_urls['local']
        self.subsid = "4296"
        self.url_query = self.test_url + "?subsid=" + self.subsid

        # create a new Firefox session
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)
        self.polis_iframe = 'polis_3dzterdfcv'

    def tearDown(self):
        self.driver.quit()

    def click_within_poll(self):
        WebDriverWait(self.driver, 20).until(
            EC.element_to_be_clickable((By.ID, self.polis_iframe))
        )
        polis_container = self.driver.find_element_by_id(self.polis_iframe)

        self.driver.switch_to.frame(polis_container)
        disagree_button = self.driver.find_element_by_id('comment_form_textarea')
        disagree_button.click()
        self.driver.switch_to.default_content()

    def test_loading_page_without_id_gives_error(self):
        self.driver.get(self.test_url)
        message = self.driver.find_element_by_id('message')

        expected = "You seem to have got here by accident."
        observed = message.text

        self.assertIn(expected, observed)
        polis_container = self.driver.find_element_by_id(self.polis_iframe)
        self.assertFalse(polis_container.is_displayed())

    def test_loading_page_with_subsid_shows_iframe(self):
        self.driver.get(self.url_query)
        polis_container = self.driver.find_element_by_id(self.polis_iframe)
        self.assertTrue(polis_container.is_displayed())

    def test_dynata_button_isnt_visible_until_iframe_clicked(self):
        self.driver.get(self.url_query)
        time.sleep(5)

        voted_button = self.driver.find_elements_by_id('voted')
        self.assertEqual(0, len(voted_button), "Can see button but shouldn't")

        self.click_within_poll()
        voted_button = self.driver.find_elements_by_id('voted')
        self.assertEqual(1, len(voted_button), "Can't see button but want to")

    def test_dynata_button_isnt_visible_until_iframe_clicked_10_times(self):
        self.driver.get(self.url_query)

        for i in range(9):
            voted_button = self.driver.find_elements_by_id('voted')
            self.assertEqual(0, len(voted_button),
                             "Can see button on click " + str(i))
            self.click_within_poll()
            print("That was click " + str(i+1))

        self.click_within_poll()
        voted_button = self.driver.find_elements_by_id('voted')
        self.assertEqual(1, len(voted_button), "Can't see button but want to")