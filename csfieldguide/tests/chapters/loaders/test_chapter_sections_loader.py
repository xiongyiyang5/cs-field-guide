import os.path
from unittest import mock
from django.core.exceptions import ValidationError
from tests.BaseTestWithDB import BaseTestWithDB
from tests.chapters.ChaptersTestDataGenerator import ChaptersTestDataGenerator
from tests.interactives.InteractivesTestDataGenerator import InteractivesTestDataGenerator
from chapters.management.commands._ChapterSectionsLoader import ChapterSectionsLoader
from chapters.models import Chapter, ChapterSection
from utils.errors.MissingRequiredFieldError import MissingRequiredFieldError
from utils.errors.NoHeadingFoundInMarkdownFileError import NoHeadingFoundInMarkdownFileError
from utils.errors.CouldNotFindMarkdownFileError import CouldNotFindMarkdownFileError
from utils.errors.KeyNotFoundError import KeyNotFoundError


class ChapterSectionsLoaderTest(BaseTestWithDB):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.test_data = ChaptersTestDataGenerator()
        self.interactives_test_data = InteractivesTestDataGenerator()
        self.loader_name = "chapter-sections"
        self.base_path = os.path.join(self.test_data.LOADER_ASSET_PATH, self.loader_name)

    def test_chapters_chapter_section_loader_single_section(self):
        test_slug = "single-section"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: This is the section heading>"]
        )

    def test_chapters_chapter_section_loader_multiple_sections(self):
        test_slug = "multiple-sections"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            [
                "<ChapterSection: This is the first section>",
                "<ChapterSection: This is the second section>"
            ]
        )

    def test_chapters_chapter_section_loader_missing_section_number(self):
        test_slug = "missing-section-number"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            MissingRequiredFieldError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_duplicate_section_numbers(self):
        test_slug = "duplicate-section-numbers"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            ValidationError,
            chapter_section_loader.load
        )

    def test_chapters_chapter_section_loader_missing_name(self):
        test_slug = "missing-name"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            NoHeadingFoundInMarkdownFileError,
            chapter_section_loader.load
        )


    @mock.patch(
        "django.contrib.staticfiles.finders.find",
        return_value=True
    )
    def test_chapters_chapter_section_loader_interactive(self, find_image_files):
        test_slug = "interactives"
        chapter = self.test_data.create_chapter("1")
        interactive1 = self.interactives_test_data.create_interactive(1)
        interactive2 = self.interactives_test_data.create_interactive(2)
        interactive3 = self.interactives_test_data.create_interactive(3)
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        chapter_section_loader.load()
        self.assertTrue(find_image_files.called)
        self.assertQuerysetEqual(
            ChapterSection.objects.all(),
            ["<ChapterSection: Interactives>"]
        )
        self.assertEqual(
            list(Chapter.objects.get(slug=chapter.slug).interactives.order_by("slug")),
            [
                interactive1,
                interactive2,
                interactive3,
            ]
        )

    def test_chapters_chapter_section_loader_interactive_invalid(self):
        test_slug = "invalid-interactive"
        chapter = self.test_data.create_chapter("1")
        factory = mock.Mock()
        chapter_section_loader = ChapterSectionsLoader(
            factory,
            chapter,
            base_path=self.base_path,
            content_path=test_slug,
            structure_filename="{}.yaml".format(test_slug),
        )
        self.assertRaises(
            KeyNotFoundError,
            chapter_section_loader.load
        )
