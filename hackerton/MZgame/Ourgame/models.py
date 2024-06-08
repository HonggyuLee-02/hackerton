from django.db import models

class Record(models.Model):
    name = models.CharField(max_length=100)
    score = models.FloatField()

    def __str__(self):
        return f"{self.name} - {self.score}"