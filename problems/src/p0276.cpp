#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.push_back(1);

    int* p = v.data();
    v.clear();

    std::cout << *p << "\n";
}
