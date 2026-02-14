#include <iostream>
#include <vector>

int main() {
    std::vector<bool> v(1);
    auto a = v[0];
    bool b = v[0];

    a = true;

    std::cout << b << v[0] << static_cast<bool>(a) << "\n";
}
