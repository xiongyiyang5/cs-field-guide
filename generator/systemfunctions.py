"""System Functions Module - CSFG
    -Contains: Helper functions for guide creation
    -Authors: Jordan Griffiths, Jack Morgan
"""

import string
import configparser
import argparse

def to_kebab_case(text):
    """Returns the given text as kebab case.
    The text is lower case, has spaces replaced as dashes.
    All punctuation is also removed.
    """
    text = ''.join(letter for letter in text if letter in set(string.ascii_letters + string.digits + ' -'))
    text = text.replace(' ', '-').lower()
    return text


def from_kebab_case(text):
    """Returns given kebab case text to plain text.
    Text is camel case, with dashs replaced with spaces
    """
    return text.replace('-', ' ').title()


def read_settings(settings_location, file_type='conf'):
    """Read the given setting file
    and return the configparser
    """
    settings = None
    if file_type == 'conf':
        settings = configparser.ConfigParser()
        settings.optionxform = str
        #settings.default_section = 'Main'
        settings.read(settings_location)
    elif file_type == 'yaml':
        with open(settings_location, 'r', encoding='utf8') as settings_file:
            settings_text = settings_file.read()
        import yaml
        settings = yaml.load(settings_text)
    return settings


def command_line_args():
    """Setup arg parser, and add required argument handling. Return
    namespace generated by parser arguments
    """
    argsparser = argparse.ArgumentParser(description='guide generator args')

    argsparser.add_argument('--language', '-l',
                            dest='languages',
                            nargs='*',
                            default=['en'],
                            help='Outputs in the given languages (defaults to \'en\')')
    argsparser.add_argument('--teacher', '-t',
                            dest='teacher_output',
                            action='store_true',
                            help='Outputs both student and teacher versions of the CSFG')
    argsparser.add_argument('--pdf', '-p',
                            dest='include_pdf',
                            action='store_true',
                            help='Include generation of PDF version of the CSFG')
    argsparser.add_argument('--pdf-only', '-q',
                            dest='pdf_only',
                            action='store_true',
                            help='Only generate PDF version of the CSFG')

    return argsparser.parse_args()
