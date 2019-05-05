Application workflows


# Creating a new concept

Goal: I have a couple PDFs that I want to store in the KB
    1) A presentation about 'First Order Logic': http://www.cs.cornell.edu/courses/cs4700/2011fa/lectures/16_FirstOrderLogic.pdf
    2) A publication 'Ontology 101': https://protege.stanford.edu/publications/ontology_development/ontology101.pdf

## Options for the type of a 'Concept'

- owl:Class

- ltp:Concept

- schema:Thing



## Steps:

* Create a named concept

_:fol   rdf:type     rdfs:Class
_:fol   rdfs:label   "First Order Logic"

* Import the doc

_:doc1   rdf:type     schema:DigitalDocument
_:fol   rdfs:label   "Cornell cs4700 Lecture 16: First Order Logic"

* Link to concept

_:fol   schema:subjectOf   _:doc1

