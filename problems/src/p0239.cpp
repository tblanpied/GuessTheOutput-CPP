#include <iostream>
#include <vector>

int main() {
    std::vector<int> v;
    v.reserve(1);

    v.push_back(1);
    int* p = &v[0];

    v.push_back(2);
    std::cout << *p << "\n";
}
