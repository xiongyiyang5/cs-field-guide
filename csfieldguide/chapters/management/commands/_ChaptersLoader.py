"""Custom loader for loading a topic."""

from django.db import transaction
from utils.BaseLoader import BaseLoader
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from chapters.models import Chapter


class ChaptersLoader(BaseLoader):
    """Custom loader for loading chapters."""

    def __init__(self, factory, structure_file_path, chapter_slug, chapter_structure, BASE_PATH):
        """Create the loader for loading a topic.

        Args:
            factory (LoaderFactory): Object for creating other loaders.
            structure_file_path (str): Path to application structure file.
            chapter_slug (str): Key for chapter to load.
            chapter_stucture (dict): Attributes for the chapter (e.g. chapter number).
            BASE_PATH (str): Base file path.
        """
        super().__init__(BASE_PATH)
        self.factory = factory
        self.structure_file_path = structure_file_path
        self.chapter_slug = chapter_slug
        self.chapter_structure = chapter_structure
        self.BASE_PATH = "{}chapters/{}".format(BASE_PATH, self.chapter_slug)

    @transaction.atomic
    def load(self):
        """Load the content for a chapter.

        Raises:
            MissingRequiredFieldError: When a config (yaml) file is missing a required
                field.
        """
        chapter_number = self.chapter_structure.get("chapter-number", None)
        if chapter_number is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["sections", "chapter-number", "title"],
                "Chapter number"
            )

        chapter_title = self.chapter_structure.get("title", None)
        if chapter_title is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["sections", "chapter-number", "title"],
                "Chapter title"
            )

        chapter_icon = self.chapter_structure.get("icon", None)

        # Create chapter object and save to the db
        chapter = Chapter(
            slug=self.chapter_slug,
            name=chapter_title,
            number=chapter_number,
            other_resources=None,
            icon=chapter_icon
        )
        chapter.save()

        sections_yaml = self.section_structure.get("sections", None)
        if sections_yaml is None:
            raise MissingRequiredFieldError(
                self.structure_file_path,
                ["sections", "chapter-number", "title"],
                "Chapter sections"
            )

        sections_path, sections_structure_file = os.path.split(sections_yaml)

        for (section_slug, section_structure) in chapter_sections.items():
            self.factory.create_chapter_section_loader(
                self.structure_file_path,
                chapter,
                section_slug,
                section_structure,
                self.BASE_PATH
            ).load()

        self.log("Added Chapter: {}".format(chapter.name))

        self.log("")
