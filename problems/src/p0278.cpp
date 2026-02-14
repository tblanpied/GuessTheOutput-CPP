#include <iostream>

int main() {
    int x = 1;
    const int& r = x;

    int& t = const_cast<int&>(r);
    t = 2;

    std::cout << x << "\n";
}
