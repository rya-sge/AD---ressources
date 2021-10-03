/* ---------------------------
Template
File : main.h
Authors : Based on a laboratory made by David Pellissier, Michael Ruckstuhl, Ryan Sauge
Date : 23.01.2021 / 08.2021

Purpose : Wrapper used to define the contains, insert and erase functions in order to be able to use any structure
in a dictionary

Compilateur : gcc 9.3.0
--------------------------- */
#include <iostream>
#include <chrono>
#include <algorithm>
#include "wrapper.h"
#include <vector>
#include <unordered_set>
#include <deque>
#include <assert.h>

using namespace std;



/**
 * @details
 *  insert values at the end of the vector
 *	Sort the vector
 *
 */
void testVector(){
    // Creation
    vector<string> test;
    DictionaryContainer<string> dc([&test](const string &KEY) { return binary_search(test.begin(), test.end(), KEY); },
                                   [&test](const string &KEY) { test.push_back(KEY); },
                                   [&test](const string &KEY) { test.erase(lower_bound(test.begin(), test.end(), KEY)); });

    dc.insert("Test");
    dc.insert("Alfred");
    dc.insert("Gimmove");
    sort(test.begin(), test.end());
    assert(dc.contains("Gimmove") == true);
    dc.erase("Gimmove");
    assert(dc.contains("Gimmove") == false);
}

void testUnordered(){

    // Creation
    unordered_set<string> test;
    DictionaryContainer<string> dc([&test](const string &KEY) { return test.find(KEY) != test.end(); },
                                   [&test](const string &KEY) { test.insert(KEY); },
                                   [&test](const string &KEY) { test.erase(KEY); });
    dc.insert("Test");
    dc.insert("Alfred");
    dc.insert("Gimmove");
    assert(dc.contains("Gimmove") == true);
    dc.erase("Gimmove");
    assert(dc.contains("Gimmove") == false);

}

void testDeque(){

    // Creation
    deque<string> test;
    DictionaryContainer<string> dc([&test](const string &KEY) { return binary_search(test.begin(), test.end(), KEY); },
                                   [&test](const string &KEY) { test.push_back(KEY); },
                                   [&test](const string &KEY) {
                                       test.erase(lower_bound(test.begin(), test.end(), KEY));
                                   });

    dc.insert("Test");
    dc.insert("Alfred");
    dc.insert("Gimmove");
    sort(test.begin(), test.end());
    assert(dc.contains("Gimmove") == true);
    dc.erase("Gimmove");
    assert(dc.contains("Gimmove") == false);

}
int main() {
    testUnordered();
    testVector();
    testDeque();
    return 0;
}
