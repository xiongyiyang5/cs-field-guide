"""Models for the chapters application."""

from django.db import models
from interactives.models import Interactive
from django.core.exceptions import ValidationError
from utils.TranslatableModel import TranslatableModel


class GlossaryTerm(TranslatableModel):
    """Model for glossary term in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    term = models.CharField(max_length=200, unique=True)
    definition = models.TextField()

    def __str__(self):
        """Text representation of GlossaryTerm object.

        Returns:
            Term attribute of GlossaryTerm (str).
        """
        return self.term

    class Meta:
        """Set consistent ordering of Glossary Terms."""

        ordering = ["term"]


class Chapter(TranslatableModel):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField(unique=True)
    introduction = models.TextField(default="")
    icon = models.CharField(max_length=100)
    interactives = models.ManyToManyField(
        Interactive,
        related_name="chapter",
    )
    video = models.URLField(blank=True, default="")

    def __str__(self):
        """Text representation of Chapter object.

        Returns:
            Name of chapter (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of chapters."""

        ordering = ["number"]
        verbose_name = "Chapter"
        verbose_name_plural = "Chapters"


class ChapterSection(TranslatableModel):
    """Model for each section in a chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField()
    name = models.CharField(max_length=100, default="")
    number = models.SmallIntegerField()
    content = models.TextField(default="")
    chapter = models.ForeignKey(
        Chapter,
        null=False,
        related_name="chapter_sections"
    )

    def __str__(self):
        """Text representation of ChapterSection object.

        Returns:
            Heading of chapter section (str).
        """
        return self.name

    def clean(self):
        """Use to check for unique section numbers.

        Raises:
            ValidationError: when the section being added uses
                an existing section number for this chapter.
        """
        # get all sections with same section number and chapter as new section being added
        sections = ChapterSection.objects.filter(number=self.number, chapter=self.chapter)
        # if already exists section with same number in same chapter, then throw error!
        if len(sections) > 1:
            raise ValidationError(('Section number must be unique per chapter.'))

    def save(self, *args, **kwargs):
        """Override save method to validate unique section numbers."""
        super(ChapterSection, self).save(*args, **kwargs)
        self.clean()

    class Meta:
        """Set consistent ordering of chapter sections."""

        ordering = ["number"]
        verbose_name = "Chapter section"
        verbose_name_plural = "Chapter sections"
