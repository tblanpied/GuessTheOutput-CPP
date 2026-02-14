#include <iostream>
#include <vector>

std::vector<int> make() { return {1, 2}; }

int main() {
    for (int x : make()) std::cout << x;
    std::cout << "\n";
}
