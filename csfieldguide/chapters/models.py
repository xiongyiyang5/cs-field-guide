"""Models for the chapters application."""

from django.db import models


class GlossaryTerm(models.Model):
    """Model for glossary term in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    term = models.CharField(max_length=200, unique=True, null=True)
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


class Chapter(models.Model):
    """Model for chapter in database."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=100)
    number = models.SmallIntegerField(unique=True)
    other_resources = models.TextField(null=True)
    icon = models.CharField(max_length=100, null=True)

    def __str__(self):
        """Text representation of Chapter object.

        Returns:
            Name of chapter (str).
        """
        return self.name

    class Meta:
        """Set consistent ordering of chapters."""

        ordering = ["number"]


class ChapterSection(models.Model):
    """Model for each section in a chapter."""

    #  Auto-incrementing 'id' field is automatically set by Django
    slug = models.SlugField(unique=True)
    heading = models.CharField(max_length=100)
    number = models.SmallIntegerField(unique=True)
    content = models.TextField()
    chapter = models.ForeignKey(
        Chapter,
        null=False,
        related_name="chapter_section"
    )

    def __str__(self):
        """Text representation of ChapterSection object.

        Returns:
            Heading of chapter section (str).
        """
        return self.heading

    class Meta:
        """Set consistent ordering of chapter sections."""

        ordering = ["number"]
