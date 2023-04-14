const Book = require("../models/Book");
const fs = require("fs");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  /* delete bookObject._id;
  delete bookObject._userId; */
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "objet enregistré" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete bookObject._userId;
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: "Non autorisé" });
      } else {
        const filename = book.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error }));
};
exports.bestRatingBook = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.ratingBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          ratings: {
            userId: req.body.userId,
            grade: req.body.rating,
          },
        },
      },
      { new: true }
    );
    const ratingLength = book.ratings.length;
    const averageRating =
      book.ratings.reduce((somme, rating) => somme + rating.grade, 0) /
      ratingLength;
    book.averageRating = averageRating;
    id = req.params.id;
    await book.save();
    // console.log(book);
    return res.status(200).json({ book, id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// const Element = require("../models/element"); // Importer le modèle de l'élément

// Contrôleur pour noter un élément
/* exports.noterElement = async (req, res, next) => {
  const { elementId, note } = req.body; // Récupérer les données du corps de la requête

  try {
    // Rechercher l'élément dans la base de données par son identifiant
    const element = await Element.findById(elementId);

    if (!element) {
      return res.status(404).json({ message: "Élément non trouvé" });
    }

    // Mettre à jour la note de l'élément
    element.notes.push(note);
    await element.save();

    // Calculer la moyenne des notes de l'élément
    const moyenne =
      element.notes.reduce((acc, note) => acc + note, 0) / element.notes.length;

    // Répondre avec la moyenne mise à jour
    return res.status(200).json({ moyenne });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}; */

