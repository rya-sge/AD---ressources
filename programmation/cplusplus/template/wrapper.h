/* ---------------------------
Template
File : wrapper.h
Authors : David Pellissier, Michael Ruckstuhl, Ryan Sauge
Date : 23.01.2021 / 08.2021

Purpose : Wrapper used to define the contains, insert and erase functions in order to be able to use any structure
in a dictionary

Compilateur : gcc 9.3.0
--------------------------- */

#ifndef WRAPPER_H
#define WRAPPER_H

#include <functional>


template<typename T>
class DictionaryContainer {

    using boolFunction =  std::function<bool(const T &key)>;
    using voidFunction =  std::function<void(const T &key)>;

    const boolFunction contains_inside;
    const voidFunction insert_inside;
    const voidFunction erase_inside;

public:

    /**
     * @param containsFunction Loop up a key in the container
     * @param insertFunction  Insert a key in the container
     * @param eraseFunction Delete a key from the container.
     * @details The structure is not stored in this class.
     */
    DictionaryContainer(const boolFunction &containsFunction, const voidFunction &insertFunction,
                        const voidFunction &eraseFunction)
            : contains_inside(containsFunction), insert_inside(insertFunction), erase_inside(eraseFunction) {}

    /**
     * @brief Loop up a key in the dictionary
     * @param key
     * @return true if the key exists
     */
    bool contains(const T &key) const {
        return contains_inside(key);
    }

    /**
     * @brief Insert a key in the dictionary
     * @param key
     */
    void insert(const T &key) const {
        insert_inside(key);
    }

    /**
     * @brief Delete a key from the dictionary
     * @param key
     */
    void erase(const T &key) const {
        erase_inside(key);
    }
};

#endif //WRAPPER_H
