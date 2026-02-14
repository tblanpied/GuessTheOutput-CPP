#include <iostream>
#include <vector>

int main() {
    std::vector<int> a(3, 1);
    std::vector<int> b{3, 1};

    std::cout << a.size() << ' ' << b.size() << "\n";
}
