"""Custom loader for loading an interactive."""

import os.path
from django.db import transaction

from utils.BaseLoader import BaseLoader

from chapters.models import Interactive


class InteractiveLoader(BaseLoader):
    """Custom loader for loading chapters."""

    def __init__(self, structure_file_path, interactives, BASE_PATH):
        """Create the loader for loading a topic.

        Args:
            structure_file_path: path to application structure file (str).
            interactives: list of interactives to load (list).
            BASE_PATH: Base file path (str).
        """
        super().__init__(BASE_PATH)
        self.structure_file_path = structure_file_path
        # self.BASE_PATH = os.path.join(BASE_PATH, "chapters")

    @transaction.atomic
    def load(self):
        """Load the paths to interactive templates."""

        # Create interactive object and save to the db
        interactive = Interactive(
        )
        interactive.save()

        self.log("Added Interactive: {}".format(interactive.name))

        self.log("")
